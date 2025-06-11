<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        Book::insert([
        [
            'title' => 'A sociedade do anel, Parte 1',
            'description' => '"A Sociedade do Anel" é o primeiro volume da trilogia O Senhor dos Anéis, escrita por J.R.R. Tolkien. A história acompanha Frodo Bolseiro, um hobbit que herda um anel mágico com um poder imenso e perigoso. Ao descobrir que o artefato é o Um Anel, criado pelo Senhor do Escuro Sauron para dominar a Terra-média, Frodo parte em uma jornada para destruí-lo. Ele é acompanhado por um grupo formado por hobbits, um mago, um elfo, um anão e dois homens — a chamada Sociedade do Anel. Juntos, eles enfrentam desafios e inimigos enquanto lutam contra as forças das trevas. A obra combina aventura, mitologia e fantasia em um mundo ricamente construído.',
            'cover' => 'book_covers/senhoranel.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2F1-a-sociedade-do-anel-jrr-tolkien.pdf?alt=media&token=5eab0f9d-30da-49ea-84b0-b32dbad4a4bb',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Database System Concepts Sixth Edition',
            'description' => 'Escrito por Abraham Silberschatz, Henry F. Korth e S. Sudarshan, oferece uma introdução abrangente aos conceitos fundamentais de sistemas de banco de dados. A obra aborda temas como modelagem de dados (com destaque para o modelo relacional), linguagem SQL, projeto de banco de dados, normalização, processamento de consultas, transações, controle de concorrência e recuperação de falhas. É conhecido por seu equilíbrio entre teoria e prática, sendo referência tanto em cursos universitários quanto no mercado profissional da área de bancos de dados.',
            'cover' => 'book_covers/dbscabrahamsilber.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2FDatabase%20System%20Concepts%206th%20edition.pdf?alt=media&token=9ba2caef-3067-4a3d-ba9c-ba90b391b489',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Administração, Empreendedorismo e Inovação 4',
            'description' => 'A obra reúne conteúdos atualizados sobre práticas modernas de administração, empreendedorismo e inovação. Traz estudos de caso, conceitos fundamentais e reflexões sobre o papel das novas tecnologias e da mentalidade inovadora no ambiente organizacional. É indicada para estudantes, empreendedores e profissionais que desejam compreender como alinhar a gestão estratégica com a criação de valor e a inovação contínua.',
            'cover' => 'book_covers/admempinov4atena.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2FE-book-Administracao-Empreendedorismo-e-Inovacao-4.pdf?alt=media&token=da917601-37ec-44d8-a7ac-ac8de2d678ba',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Fundamentals of Database Systems',
            'description' => 'Escrito por Ramez Elmasri e Shamkant B. Navathe, este livro é uma das principais referências acadêmicas sobre bancos de dados. Ele cobre desde os conceitos básicos de modelagem até tópicos avançados como data warehousing, segurança, big data e bancos de dados orientados a objetos. A obra é amplamente adotada em universidades e essencial para quem deseja compreender profundamente o funcionamento dos sistemas de gerenciamento de banco de dados.',
            'cover' => 'book_covers/fundamentalsofdatabase.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2FFundamentals_of_Database_Systems_6th_Edition-1.pdf?alt=media&token=7383f07c-791c-4c03-bc5d-b1422d727199',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Introdução e boas práticas em UX Design',
            'description' => 'Este livro apresenta os princípios fundamentais do UX Design (User Experience), oferecendo uma introdução clara e prática sobre como criar experiências digitais mais eficientes e centradas no usuário. Aborda temas como usabilidade, acessibilidade, pesquisa com usuários, prototipagem e testes. É ideal para iniciantes ou profissionais de design e tecnologia que desejam aprimorar suas habilidades em experiência do usuário.',
            'cover' => 'book_covers/uxdesingnewqhuieqw.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2FIntrodução%20e%20boas%20práticas%20em%20UX%20Design%20-%20Casa%20do%20Codigo.pdf?alt=media&token=c6420e1e-33fc-4bbc-9907-c7e14963f57d',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'O poder do hábito',
            'description' => 'Escrito por Charles Duhigg, o livro investiga como os hábitos funcionam, como são formados e como podem ser transformados. Por meio de histórias reais e estudos científicos, o autor mostra como os hábitos influenciam nossa vida pessoal, profissional e social. A obra oferece estratégias práticas para mudar comportamentos e desenvolver rotinas mais produtivas e saudáveis.',
            'cover' => 'book_covers/opoderdohabitoeqwhueqiw.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2FO_poder_do_Hábito.pdf.pdf?alt=media&token=99deac9d-ec22-4f7e-8a8b-e4c21f1dfd1d',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Uma breve história da humanidade',
            'description' => 'Em Sapiens: Uma Breve História da Humanidade, o historiador Yuval Noah Harari traça a evolução da espécie humana desde o surgimento do Homo sapiens até o século XXI. Com linguagem acessível e embasamento histórico, o autor discute como a biologia, a cultura e a economia moldaram as sociedades modernas, levantando reflexões sobre ética, tecnologia e o futuro da humanidade.',
            'cover' => 'book_covers/sapiensyuvalnoah.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2FSapiens%20Uma%20Breve%20História%20da%20Humanidade.pdf?alt=media&token=c8916318-4656-41f8-8a54-d2c1f8f03591',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Database Management Systems - Third Edition',
            'description' => 'Autorado por Raghu Ramakrishnan e Johannes Gehrke, esta obra é uma referência sólida no estudo de sistemas de gerenciamento de banco de dados. Aborda tópicos como arquitetura de SGBDs, linguagens de consulta, projeto físico de bancos, processamento de transações e sistemas distribuídos. É amplamente usada em cursos universitários e recomendada para profissionais da área de TI.',
            'cover' => 'book_covers/dabaseewquehqwui.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2FRamakrishnan%20-%20Database%20Management%20Systems%203rd%20Edition.pdf?alt=media&token=dba4ba1a-a90e-4c9b-860c-a2fb192543aa',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'A Arte da Guerra',
            'description' => 'Escrito por Sun Tzu há mais de 2.000 anos, A Arte da Guerra é um tratado militar que transcende o campo da guerra, sendo amplamente utilizado em áreas como administração, estratégia empresarial e desenvolvimento pessoal. A obra apresenta ensinamentos sobre liderança, planejamento, tomada de decisão e análise do inimigo, sendo considerada um manual atemporal de estratégia.',
            'cover' => 'book_covers/aartedaguerraheqwuhuiewqu.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2Fa-arte-da-guerra5e8e0e84.pdf?alt=media&token=1bc8b6d8-ba96-4b4e-a161-ab1d6b83d309',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'A Startup Enxuta',
            'description' => 'Escrito por Eric Ries, o livro introduz o conceito de Lean Startup, uma metodologia que permite criar e gerir startups de forma mais eficiente, focando em experimentação rápida, feedback constante e iteração. A obra ensina como validar ideias com o mínimo de recursos, acelerar o aprendizado e construir negócios sustentáveis e escaláveis.',
            'cover' => 'book_covers/startupenxutauewqheuqwhuiueqw.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2Fa-startup-enxuta-eric-ries-livro-completo.pdf?alt=media&token=b327e248-bb7d-4e01-a683-436fb276b74b',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => '1984',
            'description' => 'Obra clássica de George Orwell, 1984 é um romance distópico que retrata um futuro totalitário onde o governo exerce controle absoluto sobre os cidadãos, manipulando informações e reprimindo qualquer forma de rebelião. A história de Winston Smith, um homem que tenta resistir ao sistema, levanta discussões profundas sobre liberdade, vigilância, censura e a natureza do poder.',
            'cover' => 'book_covers/1984y7wye78y78231.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2Fe-book-1984.pdf?alt=media&token=ee9a059c-b1a7-4afa-ab99-366dd2fb541b',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'SQL For Smarties',
            'description' => 'Escrito por Joe Celko, SQL For Smarties é um guia avançado para desenvolvedores que já possuem conhecimentos básicos de SQL e desejam dominar técnicas mais sofisticadas. O livro explora tópicos como subconsultas, funções agregadas, junções complexas e soluções para problemas comuns em bancos de dados relacionais, com foco em performance e boas práticas.',
            'cover' => 'book_covers/sqlforsmartiesew89qy78321.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2Fcelkos-sql-for-smarties-2005.pdf?alt=media&token=94e15c9b-108e-48ec-b465-eb79e3dcedd9',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'O Grande Gatsby',
            'description' => 'Escrito por F. Scott Fitzgerald, O Grande Gatsby é um clássico da literatura americana que retrata a alta sociedade dos anos 1920. Através da história de Jay Gatsby, um homem misterioso e rico que busca reconquistar um amor do passado, o romance expõe os excessos, ilusões e desigualdades do chamado "Sonho Americano".',
            'cover' => 'book_covers/grandegatsbyewquehqwyueq.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2Ff-scott-fitzgerald-o-grande-gatsby.pdf?alt=media&token=dd2ea3c1-4788-44f4-aa27-fcd797df0052',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Fullstack React - The Complete Guide to ReactJS and Friends',
            'description' => 'Este livro é uma referência prática para desenvolvedores que desejam dominar o ecossistema React. Cobre desde os fundamentos do React até tópicos como Redux, Hooks, testes, e integração com backend. Repleto de exemplos reais e código funcional, é ideal para quem quer construir aplicações modernas com React de forma profissional.',
            'cover' => 'book_covers/fullstackreact8q9wye8923y1.png',
            'pdf_url' => 'https://firebasestorage.googleapis.com/v0/b/gbookcr.appspot.com/o/images%2FbooksUrl%2Ffullstack-react-book-r30_1510302324482009603.pdf?alt=media&token=45c7ccfc-0a0e-41bf-b464-3c89c4781e9c',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'title' => 'Clean Code: A Handbook of Agile Software Craftsmanship',
            'description' => 'Escrito por Robert C. Martin, Clean Code é um guia essencial para desenvolvedores que desejam escrever código mais limpo, legível e de fácil manutenção. A obra apresenta princípios, padrões e boas práticas da programação orientada a objetos, mostrando como pequenas decisões podem ter um grande impacto na qualidade do software. É leitura obrigatória para profissionais que valorizam excelência técnica.',
            'cover' => 'book_covers/cleancode89321u89321y89321.png',
            'pdf_url' => 'https://kolegite.com/EE_library/books_and_lectures/Програмиране/Clean%20Code%20-%20%20A%20Handbook%20of%20Agile%20Software%20Craftsmanship.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);
    }
}
