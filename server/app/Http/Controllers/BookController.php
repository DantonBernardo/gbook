<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::orderBy('created_at', 'desc')->get();
        return response()->json($books);
    }

    public function show(string $id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image',
        ]);

        $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();

        return response()->json([
            'url' => $uploadedFileUrl,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:400',
                'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'pdf_url' => [
                    'required',
                    'starts_with:http,https',
                    'url',
                    function ($attribute, $value, $fail) {
                        if (str_starts_with(strtolower($value), 'javascript:')) {
                            $fail('Links com "javascript:" não são permitidos.');
                        }
                    },
                ],
            ],[
                'title.required' => 'O título é obrigatório.',
                'title.string' => 'O título deve ser um texto válido.',
                'title.max' => 'O título deve ter no máximo 255 caracteres.',

                'description.required' => 'A descrição é obrigatória.',
                'description.string' => 'A descrição deve ser um texto válido.',
                'description.max' => 'A descrição deve ter no máximo 400 caracteres.',

                'cover.image' => 'A capa deve ser uma imagem válida.',
                'cover.mimes' => 'A capa deve estar no formato JPEG, PNG ou JPG.',
                'cover.max' => 'A imagem da capa deve ter no máximo 2MB.',

                'pdf_url.required' => 'O link do PDF é obrigatório.',
                'pdf_url.starts_with' => 'O link do PDF deve começar com http ou https.',
                'pdf_url.url' => 'O link do PDF deve ser uma URL válida.',
            ]);

            $user = JWTAuth::user();

            if (!$user) {
                return response()->json(['message' => 'Usuário não autenticado'], 401);
            }

            // Verifica se foi enviada uma imagem de capa
            if ($request->hasFile('cover')) {
                // Armazena a imagem localmente
                $path = $request->file('cover')->store('book_covers', 'public');
                
                // Salva o caminho relativo da imagem
                $validated['cover'] = $path;
            } else {
                $validated['cover'] = null;
            }

            $validated['user_id'] = $user->id;

            $book = Book::create($validated);

            return response()->json([
                'message' => 'Livro criado com sucesso!',
                'data' => $book,
            ], 201);

        } catch (ValidationException $e) {
            $errors = $e->errors();
            $firstErrorMessage = collect($errors)->flatten()->first(); // pega a primeira mensagem

            return response()->json([
                'message' => $firstErrorMessage ?? 'Erro de validação',
                'errors' => $errors,
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao cadastrar o livro.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $user = JWTAuth::user();
            if (!$user) {
                return response()->json(['message' => 'Usuário não autenticado'], 401);
            }

            $book = Book::findOrFail($id);

            if ($book->user_id !== $user->id) {
                return response()->json(['message' => 'Não autorizado'], 403);
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:400',
                'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'pdf_url' => [
                    'required',
                    'starts_with:http,https',
                    'url',
                    function ($attribute, $value, $fail) {
                        if (str_starts_with(strtolower($value), 'javascript:')) {
                            $fail('Links com "javascript:" não são permitidos.');
                        }
                    },
                ],
            ],[
                'title.required' => 'O título é obrigatório.',
                'title.string' => 'O título deve ser um texto válido.',
                'title.max' => 'O título deve ter no máximo 255 caracteres.',

                'description.required' => 'A descrição é obrigatória.',
                'description.string' => 'A descrição deve ser um texto válido.',
                'description.max' => 'A descrição deve ter no máximo 400 caracteres.',

                'cover.image' => 'A capa deve ser uma imagem válida.',
                'cover.mimes' => 'A capa deve estar no formato JPEG, PNG ou JPG.',
                'cover.max' => 'A imagem da capa deve ter no máximo 2MB.',

                'pdf_url.required' => 'O link do PDF é obrigatório.',
                'pdf_url.starts_with' => 'O link do PDF deve começar com http ou https.',
                'pdf_url.url' => 'O link do PDF deve ser uma URL válida.',
            ]);

    
            // Tratamento da capa (se for enviada)
            if ($request->hasFile('cover')) {
                // Remove a capa antiga se existir
                if ($book->cover) {
                    Storage::disk('public')->delete($book->cover);
                }
                
                // Armazena a nova imagem
                $path = $request->file('cover')->store('book_covers', 'public');
                $validated['cover'] = $path;
            }

            // Atualiza o livro
            $book->update($validated);

            return response()->json([
                'message' => 'Livro atualizado com sucesso!',
                'data' => $book->makeHidden(['cover']),
            ]);

        } catch (ValidationException $e) {
            $errors = $e->errors();
            $firstErrorMessage = collect($errors)->flatten()->first(); // pega a primeira mensagem

            return response()->json([
                'message' => $firstErrorMessage ?? 'Erro de validação',
                'errors' => $errors,
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Livro não encontrado'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar o livro',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $book = Book::findOrFail($id);
            
            // Verifica se o usuário tem permissão para deletar
            $user = JWTAuth::user();
            if ($book->user_id !== $user->id) {
                return response()->json(['message' => 'Não autorizado'], 403);
            }
            
            // Remove a imagem do storage se existir
            if ($book->cover && Storage::disk('public')->exists($book->cover)) {
                $currentPath = $book->cover;
                $filename = basename($currentPath);
                $newPath = 'covers_trash/' . $filename;

                Storage::disk('public')->move($currentPath, $newPath);

                // Atualiza o caminho da capa
                $book->cover = $newPath;
                $book->save();
            }
            
            // Faz o soft delete
            $book->delete();
            
            return response()->json([
                'message' => 'Livro movido para a lixeira com sucesso!',
                'book_id' => $id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao deletar o livro',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Restaurar um livro da lixeira
    public function restore(string $id)
    {
        try {
            $book = Book::onlyTrashed()->findOrFail($id);
            if ($book->cover && str_starts_with($book->cover, 'covers_trash/') && Storage::disk('public')->exists($book->cover)) {
                $currentPath = $book->cover;
                $filename = basename($currentPath);
                $newPath = 'book_covers/' . $filename;

                Storage::disk('public')->move($currentPath, $newPath);

                $book->cover = $newPath;
                $book->save();
            }
            $book->restore();
            
            return response()->json([
                'message' => 'Livro restaurado com sucesso!',
                'book_id' => $id
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao restaurar o livro',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Listar livros deletados (lixeira)
    public function trashed()
    {
        try {
            $user = JWTAuth::user();
            
            if (!$user) {
                return response()->json(['message' => 'Não autenticado'], 401);
            }

            $books = Book::onlyTrashed()
                ->where('user_id', $user->id)
                ->orderBy('deleted_at', 'desc')
                ->get()
                ->makeHidden(['cover']);

            return response()->json($books);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao recuperar livros da lixeira',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Deletar permanentemente
    public function forceDelete(string $id)
    {
        try {
            $user = JWTAuth::user();
            if (!$user) {
                return response()->json(['message' => 'Não autenticado'], 401);
            }

            $book = Book::onlyTrashed()->findOrFail($id);
            
            // Verifica se o livro pertence ao usuário
            if ($book->user_id !== $user->id) {
                return response()->json(['message' => 'Não autorizado'], 403);
            }
            
            // Remove a imagem do storage se existir
            if ($book->cover && Storage::disk('public')->exists($book->cover)) {
                Storage::disk('public')->delete($book->cover);
            }

            $book->forceDelete();
            
            return response()->json([
                'message' => 'Livro deletado permanentemente com sucesso!',
                'book_id' => $id
            ]);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Livro não encontrado na lixeira'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao deletar permanentemente o livro',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
