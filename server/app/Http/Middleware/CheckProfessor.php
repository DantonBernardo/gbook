<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckProfessor
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = JWTAuth::user();

        if (!$user || $user->type!='professor') {
            return response()->json(['error' => 'Acesso negado: somente para professores'], 403);
        }

        return $next($request);
    }
}
