// ===== Los niveles (meta: 500) =====
// Cada nivel es un array de strings (1 carácter por celda, 11 columnas, hasta 14 filas):
//   '.' vacío · b azul · r rojo · g verde · y amarillo · o naranja
//   p rosa · c celeste · v violeta · '2'/'3' gris resistente · 'X' indestructible
//
// Curva: 1-10 intro · 11-20 grises 2 · 21-30 grises 3 + X sueltos ·
// 31-50 barreras · 51-70 fortalezas · 71-90 laberintos · 91-100 final ·
// 101-120 el Ultramundo · 121-140 la Forja y el Abismo · 141-160 el Reino Helado ·
// 161-180 la Ciénaga · 181-200 el Templo Perdido
// (desde el 100 la velocidad está al tope: la dificultad es la densidad).

export const LEVELS = [

// ── 1 · Bienvenida ──
[
"..rrrrrrr..",
"..ooooooo..",
"..yyyyyyy..",
"..ggggggg..",
"..ccccccc..",
"..bbbbbbb..",
"..vvvvvvv..",
],

// ── 2 · Tablero ──
[
"r.r.r.r.r.r",
".o.o.o.o.o.",
"y.y.y.y.y.y",
".g.g.g.g.g.",
"b.b.b.b.b.b",
".c.c.c.c.c.",
"v.v.v.v.v.v",
".p.p.p.p.p.",
],

// ── 3 · Pirámide ──
[
".....r.....",
"....ooo....",
"...yyyyy...",
"..ggggggg..",
".bbbbbbbbb.",
"ccccccccccc",
"vvvvvvvvvvv",
],

// ── 4 · Corazón ──
[
"..pp...pp..",
".pppp.pppp.",
"ppppppppppp",
".ppppppppp.",
"..ppppppp..",
"...ppppp...",
"....ppp....",
".....p.....",
],

// ── 5 · Flecha ──
[
".....r.....",
"....rrr....",
"...rrrrr...",
"..rrrrrrr..",
".rrrrrrrrr.",
"rrrrrrrrrrr",
"...yyyyy...",
"...yyyyy...",
"...yyyyy...",
],

// ── 6 · Columnas ──
[
"bb..ggg..bb",
"bb..ggg..bb",
"bb..ggg..bb",
"bb..yyy..bb",
"bb..yyy..bb",
"bb..yyy..bb",
"bb..ooo..bb",
"bb..ooo..bb",
"bb..ooo..bb",
],

// ── 7 · Zigzag ──
[
"vvvv.......",
"vvvv.......",
"...vvvv....",
"...vvvv....",
"......vvvv.",
"......vvvv.",
"...cccc....",
"...cccc....",
"cccc.......",
"cccc.......",
"...yyyy....",
"...yyyy....",
],

// ── 8 · Diamante ──
[
".....g.....",
"....ggg....",
"...ggggg...",
"..ggggggg..",
".ggggggggg.",
"..ggggggg..",
"...ggggg...",
"....ggg....",
".....g.....",
],

// ── 9 · Carita feliz ──
[
"..yyyyyyy..",
".yyyyyyyyy.",
"yyy.yyy.yyy",
"yyyyyyyyyyy",
"yy.......yy",
".yy.....yy.",
"..yyyyyyy..",
],

// ── 10 · La diana ──
[
"ooooooooooo",
"o.........o",
"o....y....o",
"o...yyy...o",
"o..yyyyy..o",
"o...yyy...o",
"o....y....o",
"o.........o",
"ooooooooooo",
],

// ── 11 · Arcoíris ──
[
"rrrrrrrrrrr",
"ooooooooooo",
"yyyyyyyyyyy",
"ggggggggggg",
"ccccccccccc",
"22222222222",
],

// ── 12 · Mariposa ──
[
"pp.......pp",
"pppp...pppp",
".pppp2pppp.",
"..ppp2ppp..",
".pppp2pppp.",
"pppp...pppp",
"pp.......pp",
],

// ── 13 · Invasor ──
[
"..g.....g..",
"...g...g...",
"..ggggggg..",
".gg.ggg.gg.",
"ggggggggggg",
"g.ggggggg.g",
"g.g.....g.g",
"...gg.gg...",
"...........",
"2.2.2.2.2.2",
],

// ── 14 · Reloj de arena ──
[
"yyyyyyyyyyy",
".yyyyyyyyy.",
"..yyyyyyy..",
"...yyyyy...",
"....222....",
".....2.....",
"....222....",
"...yyyyy...",
"..yyyyyyy..",
".yyyyyyyyy.",
"yyyyyyyyyyy",
],

// ── 15 · Olas ──
[
"c.c.c.c.c.c",
"ccccccccccc",
"...........",
"b.b.b.b.b.b",
"bbbbbbbbbbb",
"...........",
"2.2.2.2.2.2",
"22222222222",
],

// ── 16 · ¡YA! ──
[
"22222222222",
"...........",
"y...y..ggg.",
".y.y..g...g",
"..y...ggggg",
"..y...g...g",
"..y...g...g",
"...........",
"22222222222",
],

// ── 17 · El gato ──
[
".yy.....yy.",
".yyy...yyy.",
".yyyyyyyyy.",
".yy2yyy2yy.",
".yyyyyyyyy.",
".yyyy2yyyy.",
"..yyyyyyy..",
"...yyyyy...",
],

// ── 18 · Damero pesado ──
[
"o2o2o2o2o2o",
"ooooooooooo",
"2o2o2o2o2o2",
"ooooooooooo",
"o2o2o2o2o2o",
],

// ── 19 · Escalera ──
[
"oooo.......",
"oooo.......",
"..oooo.....",
"..oooo.....",
"....oooo...",
"....oooo...",
"......oooo.",
"......oooo.",
".......oooo",
".......oooo",
"22222222222",
],

// ── 20 · Primera fortaleza ──
[
"22222222222",
"2rrrrrrrrr2",
"2rooooooor2",
"2royyyyyor2",
"2rooooooor2",
"2rrrrrrrrr2",
"22222222222",
],

// ── 21 · Diana custodiada ──
[
"X....3....X",
"...ggggg...",
"..gyyyyyg..",
".gyyrrryyg.",
"..gyyyyyg..",
"...ggggg...",
"...........",
"c.c.c.c.c.c",
"ccccccccccc",
],

// ── 22 · El castillo ──
[
"22.22.22.22",
"22222222222",
"2ggggggggg2",
"2ggggggggg2",
"2ggg333ggg2",
"2ggg3X3ggg2",
"22222222222",
],

// ── 23 · Jardín ──
[
".ppp...vvv.",
"pp.pp.vv.vv",
"pp3pp.vv3vv",
"pp.pp.vv.vv",
".ppp...vvv.",
"..2.....2..",
"..2.....2..",
".22.....22.",
],

// ── 24 · La nave ──
[
"..X.....X..",
".....c.....",
"....ccc....",
"...ccccc...",
"..ccccccc..",
".ccc3c3ccc.",
"ccccccccccc",
"c.c.....c.c",
"..3..3..3..",
],

// ── 25 · El cangrejo ──
[
"r.........r",
".r..rrr..r.",
"..rrrrrrr..",
".rr3rrr3rr.",
"rrrrrrrrrrr",
".rrrrrrrrr.",
"rr.rr.rr.rr",
],

// ── 26 · Letra A ──
[
"...yyyyy...",
"..yy...yy..",
".yy.....yy.",
".yyy333yyy.",
".yy.....yy.",
".yy.....yy.",
".yy.....yy.",
"...........",
"3.3.3.3.3.3",
],

// ── 27 · Torres gemelas ──
[
".333...333.",
".2b2...2b2.",
".2b2...2b2.",
".2b2...2b2.",
".2b2...2b2.",
".222...222.",
"X.........X",
"ooooooooooo",
],

// ── 28 · El pez ──
[
"...ccccc...",
"..ccccccc.c",
".c3cccccc.c",
"..ccccccc.c",
"...ccccc...",
"...........",
"b.b.b.b.b.b",
"bbbbbbbbbbb",
],

// ── 29 · El ojo ──
[
"..ooooooo..",
".oo.....oo.",
"oo..333..oo",
"oo..3X3..oo",
"oo..333..oo",
".oo.....oo.",
"..ooooooo..",
],

// ── 30 · La calavera ──
[
"X.........X",
"..2222222..",
".222222222.",
".22..2..22.",
".222222222.",
"..2222222..",
"..2.2.2.2..",
"...........",
"X.........X",
],

// ── 31 · Barrera con puerta ──
[
"22222222222",
"ggggggggggg",
"ggggggggggg",
"...........",
"XXXX...XXXX",
"...........",
"yyyyyyyyyyy",
"y.y.y.y.y.y",
],

// ── 32 · Chevrones ──
[
".....y.....",
"....yyy....",
"...yyyyy...",
"..yyyyyyy..",
".yyy...yyy.",
".....o.....",
"....ooo....",
"...ooooo...",
"..ooooooo..",
".ooo...ooo.",
"X.........X",
"2.2.2.2.2.2",
],

// ── 33 · El panal ──
[
"X....X....X",
".bb.bb.bb.b",
"b.bb.bb.bb.",
".bb.bb.bb.b",
"2.22.22.22.",
".22.22.22.2",
"y.yy.yy.yy.",
".yy.yy.yy.y",
],

// ── 34 · La cruz ──
[
"cc..rrr..cc",
"cc..rrr..cc",
"rrrrrrrrrrr",
"rrrr2X2rrrr",
"rrrrrrrrrrr",
"cc..rrr..cc",
"cc..rrr..cc",
],

// ── 35 · Corazón blindado ──
[
"..pp...pp..",
".pppp.pppp.",
"ppppppppppp",
".ppppppppp.",
"..ppppppp..",
"...ppppp...",
"....ppp....",
".....p.....",
"...........",
"XX..XXX..XX",
],

// ── 36 · El búho ──
[
".22.....22.",
".222222222.",
".2y3y2y3y2.",
".2yyy2yyy2.",
".2222o2222.",
".222222222.",
"..2222222..",
"...22222...",
"..X.....X..",
],

// ── 37 · El pino ──
[
"....ggg....",
"...ggggg...",
"..ggggggg..",
".ggggggggg.",
"..ggggggg..",
".ggggggggg.",
"ggggggggggg",
"....333....",
"....333....",
],

// ── 38 · El cohete ──
[
".....v.....",
"....vvv....",
"....vvv....",
"...vvvvv...",
"...v3v3v...",
"...vvvvv...",
"..vvvvvvv..",
".rr.vvv.rr.",
"rr...o...rr",
"....ooo....",
"...o.o.o...",
],

// ── 39 · Celosía ──
[
"X.X.X.X.X.X",
"22222222222",
".X.X.X.X.X.",
"22222222222",
"X.X.X.X.X.X",
"rrrrrrrrrrr",
".X.X.X.X.X.",
"vvvvvvvvvvv",
],

// ── 40 · Murallas ──
[
"ooooooooooo",
"o2o2o2o2o2o",
"ooooooooooo",
"...........",
"XX.XXXXX.XX",
"...........",
"33..333..33",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
],

// ── 41 · Diamantes gemelos ──
[
"..b.....v..",
".bbb...vvv.",
"bbbbb.vvvvv",
".bbb...vvv.",
"..b.....v..",
"...........",
"X...XXX...X",
"22222222222",
"ooooooooooo",
],

// ── 42 · Las puertas ──
[
"ooooooooooo",
"ggggggggggg",
"X..X...X..X",
".yy.ooo.yy.",
"X..X...X..X",
".yy.ooo.yy.",
"X..X...X..X",
"ggggggggggg",
"2.2.2.2.2.2",
],

// ── 43 · La serpiente ──
[
".ggggggggg.",
"gg.........",
"gg.........",
".ggggggggg.",
".........gg",
".........gg",
".ggggggggg.",
"...........",
"o.o.o.o.o.o",
"ooooooooooo",
],

// ── 44 · El yunque ──
[
"X.........X",
"vvvvvvvvvvv",
".vvvvvvvvv.",
"...vvvvv...",
"....vvv....",
"....vvv....",
"...22222...",
"..2222222..",
"...........",
"ggggggggggg",
],

// ── 45 · Mampostería ──
[
"cc.cc.cc.cc",
".cc.cc.cc.c",
"rr.rr.rr.rr",
".oo.oo.oo.o",
"rr.rr.rr.rr",
".oo.oo.oo.o",
"22.22.22.22",
".22.22.22.2",
],

// ── 46 · Reloj custodiado ──
[
"X.ooooooo.X",
"..ooooooo..",
"...ooooo...",
"....ooo....",
".....3.....",
"....ooo....",
"...ooooo...",
"..ooooooo..",
"X.ooooooo.X",
],

// ── 47 · Flechas gemelas ──
[
"..r.....g..",
".rrr...ggg.",
"rrrrr.ggggg",
".2r2...2g2.",
".2r2...2g2.",
".2r2...2g2.",
"...........",
"yyyyyyyyyyy",
"y.y.y.y.y.y",
],

// ── 48 · La espiral ──
[
"ooooooooooo",
"o..........",
"o.ooooooooo",
"o.o........",
"o.o.vvvvv..",
"o.o.vvvvv..",
"o.o........",
"o.ooooooooo",
"o..........",
"ooooooooooo",
],

// ── 49 · Cuatro búnkers ──
[
".2222.2222.",
".2pp2.2pp2.",
".2222.2222.",
"X....2....X",
".2222.2222.",
".2pp2.2pp2.",
".2222.2222.",
],

// ── 50 · Fortaleza media ──
[
"X333333333X",
".3vvvvvvv3.",
".3v22222v3.",
".3v2ppp2v3.",
".3v22222v3.",
".3vvvvvvv3.",
"X333333333X",
"...........",
"XX...X...XX",
"o.o.o.o.o.o",
],

// ── 51 · El reactor ──
[
"...33333...",
"..3.....3..",
".3..222..3.",
".3.2ppp2.3.",
".3..222..3.",
"..3.....3..",
"...33333...",
"...........",
"g.g.g.g.g.g",
"ggggggggggg",
],

// ── 52 · El peine ──
[
"22222222222",
"2.2.2.2.2.2",
"2.2.2.2.2.2",
"2.2.2.2.2.2",
"...........",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
],

// ── 53 · Fuertes hermanos ──
[
"33333.33333",
"3ppp3.3vvv3",
"3ppp3.3vvv3",
"33333.33333",
"...........",
"..X.....X..",
"oooo...oooo",
"oooo...oooo",
],

// ── 54 · Anillos ──
[
"ooooooooooo",
"o.........o",
"o.2222222.o",
"o.2.....2.o",
"o.2.333.2.o",
"o.2.3p3.2.o",
"o.2.333.2.o",
"o.2.....2.o",
"o.2222222.o",
"o.........o",
"ooooooooooo",
],

// ── 55 · La H ──
[
".22.....22.",
".22.....22.",
".22.....22.",
".2vvvvvvv2.",
".2vvvvvvv2.",
".22.....22.",
".22.....22.",
".22.....22.",
"...........",
"c.c.c.c.c.c",
"ccccccccccc",
],

// ── 56 · El alienígena ──
[
"..v.....v..",
"...v...v...",
"..vvvvvvv..",
".vv.vvv.vv.",
"vvvvvvvvvvv",
"v.vvvvvvv.v",
"v.v.....v.v",
"...vv.vv...",
"...........",
"2.2.2.2.2.2",
"22222222222",
],

// ── 57 · La corona ──
[
".y...y...y.",
".yy..y..yy.",
".yyy.y.yyy.",
".yyyyyyyyy.",
".yyyyyyyyy.",
".yvyvyvyvy.",
".yyyyyyyyy.",
"...........",
"22.22.22.22",
],

// ── 58 · La bóveda ──
[
"vvvvvvvvvvv",
"..XXXXXXX..",
".X.......X.",
"..2ppppp2..",
"..2p3v3p2..",
"..2ppppp2..",
"...........",
"g.g.g.g.g.g",
"ggggggggggg",
],

// ── 59 · Los bómperes ──
[
"ooooooooooo",
"ooooooooooo",
"...X...X...",
"ggggggggggg",
".X...X...X.",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
],

// ── 60 · Yin y yang ──
[
"...bbyyy...",
".bbbbbyyyy.",
".bbybbyyyy.",
"bbbbbyyyyyy",
".bbbbyybyy.",
".bbbbyyyyy.",
"...bbyyy...",
],

// ── 61 · Persianas ──
[
"ggggggggggg",
"XXXXXXX....",
"ooooooooooo",
"....XXXXXXX",
"rrrrrrrrrrr",
"XXXXXXX....",
"vvvvvvvvvvv",
],

// ── 62 · El templo ──
[
".....o.....",
"...ooooo...",
".ooooooooo.",
"ooooooooooo",
"...........",
".2..2.2..2.",
".2..2.2..2.",
".2..2.2..2.",
"33333333333",
],

// ── 63 · Zigzag de acero ──
[
"2222.......",
"3333.......",
"...2222....",
"...3333....",
"......2222.",
"......3333.",
"...2222....",
"...3333....",
"2222.......",
"3333.......",
],

// ── 64 · La caja fuerte ──
[
"X222222222X",
"X2ppppppp2X",
"X2p33333p2X",
"X2p3vvv3p2X",
"X2p33333p2X",
"X2ppppppp2X",
"X222222222X",
],

// ── 65 · Mariposa nocturna ──
[
"vv...3...vv",
"vvvv.3.vvvv",
".vvvv3vvvv.",
"..vvv3vvv..",
".vvvv3vvvv.",
"vvvv.3.vvvv",
"vv...3...vv",
"...........",
"p.p.p.p.p.p",
],

// ── 66 · La red ──
[
"2.2.2.2.2.2",
".c.c.c.c.c.",
"2.2.2.2.2.2",
".c.c.c.c.c.",
"2.2.2.2.2.2",
".c.c.c.c.c.",
"2.2.2.2.2.2",
"...........",
"ccccccccccc",
],

// ── 67 · El puente ──
[
".333...333.",
".3X3...3X3.",
".333...333.",
".333333333.",
".2.2.2.2.2.",
"...........",
"ccccccccccc",
"c.c.c.c.c.c",
],

// ── 68 · El sol ──
[
".y...y...y.",
"..y.yyy.y..",
"...yyyyy...",
"y.yyoooyy.y",
"..yoo3ooy..",
"y.yyoooyy.y",
"...yyyyy...",
"..y.yyy.y..",
".y...y...y.",
],

// ── 69 · Los satélites ──
[
"c.c.c.c.c.c",
"...ooooo...",
"..ooooooo..",
".oo33333oo.",
"..ooooooo..",
"...ooooo...",
"vv.......vv",
"...........",
"2.2.2.2.2.2",
"22222222222",
],

// ── 70 · Gran fortaleza ──
[
"X33.333.33X",
"33333333333",
"32222222223",
"32ppppppp23",
"32p2vvv2p23",
"32ppppppp23",
"32222222223",
"33333333333",
"...........",
"X...X.X...X",
"o.o.o.o.o.o",
],

// ── 71 · La serpentina ──
[
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"XXXXXXXXX..",
"...........",
"ggggggggggg",
"ggggggggggg",
"..XXXXXXXXX",
"...........",
"ooooooooooo",
"ooooooooooo",
"XXXXXXXXX..",
"...........",
"ccccccccccc",
"ccccccccccc",
],

// ── 72 · Las cámaras ──
[
"33333333333",
"33333333333",
"...........",
"XXX.XXX.XXX",
"...........",
"o2o.o2o.o2o",
"...........",
".XXX.XXX.XX",
"...........",
"ggggggggggg",
"ggggggggggg",
],

// ── 73 · El slalom ──
[
"yyyyyyyyyyy",
"XX.XXXXXXXX",
"...........",
"ooooooooooo",
"XXXXX.XXXXX",
"...........",
"ggggggggggg",
"XXXXXXXX.XX",
"...........",
"33333333333",
"33333333333",
],

// ── 74 · Peines enfrentados ──
[
"33333333333",
"3.3.3.3.3.3",
"3.3.3.3.3.3",
"...........",
".y.y.y.y.y.",
".y.y.y.y.y.",
"yyyyyyyyyyy",
],

// ── 75 · La rejilla ──
[
"22222222222",
".X.X.X.X.X.",
"22222222222",
".X.X.X.X.X.",
"22222222222",
"...........",
"3.3.3.3.3.3",
"ooooooooooo",
],

// ── 76 · Triple túnel ──
[
"vvvvvvvvvvv",
"22222222222",
"22222222222",
"..X..X..X..",
"..X..X..X..",
"ggXggXggXgg",
"..X..X..X..",
"...........",
"2.2.2.2.2.2",
"22222222222",
],

// ── 77 · Catacumbas ──
[
"33333333333",
"33333333333",
"...........",
"X.XXX.XXX.X",
".c.c.c.c.c.",
"o2o.o2o.o2o",
"...........",
"XX.XXX.XXXX",
"...........",
"g.g.g.g.g.g",
"ggggggggggg",
],

// ── 78 · La cremallera ──
[
"22222X.....",
"22222X.....",
".....X22222",
".....X22222",
"22222X.....",
"22222X.....",
".....X22222",
".....X22222",
"...........",
"22222222222",
],

// ── 79 · El radiador ──
[
"ooooooooooo",
"2.2.2.2.2.2",
"2.2.2.2.2.2",
"2.2.2.2.2.2",
"2.2.2.2.2.2",
"...........",
"XXXXX.XXXXX",
"...........",
"22222222222",
"22222222222",
],

// ── 80 · Laberinto clásico ──
[
"33333333333",
"33333333333",
"X.XXXXXXXXX",
"...........",
"ooooooooooo",
"XXXXXXXXX.X",
"...........",
"ggggggggggg",
"X.XXXXXXXXX",
"...........",
"yyyyyyyyyyy",
"XXXXX.XXXXX",
"...........",
"ccccccccccc",
],

// ── 81 · Pachinko ──
[
"33333333333",
"33333333333",
".X...X...X.",
".c.c.c.c.c.",
"...X...X...",
".c.c.c.c.c.",
".X...X...X.",
"...........",
"2.2.2.2.2.2",
"22222222222",
],

// ── 82 · Doble serpiente ──
[
"33333333333",
"33333333333",
"..XXXXXXX..",
"...........",
".222222222.",
"XXXX...XXXX",
"...........",
".ggggggggg.",
"..XXXXXXX..",
"...........",
"ccccccccccc",
"ccccccccccc",
],

// ── 83 · Las celdas ──
[
"ggggggggggg",
"v.v.v.v.v.v",
"vXvXvXvXvXv",
"v.v.v.v.v.v",
"...........",
"3X3X3X3X3X3",
"...........",
"33333333333",
"33333333333",
],

// ── 84 · El caracol ──
[
"22222222222",
"2..........",
"2.222222222",
"2.2........",
"2.2.vvvvvv.",
"2.2.vvvvvv.",
"2.2........",
"2.222222222",
"2..........",
"22222222222",
],

// ── 85 · Las compuertas ──
[
"33333333333",
"33333333333",
"XXXX..XXXXX",
"...........",
"33333333.33",
"...........",
"XXXXXXX..XX",
"...........",
"ggggggggggg",
"ggggggggggg",
],

// ── 86 · Panal de acero ──
[
"33333333333",
"2.22.22.22.",
".22.22.22.2",
"X..X..X..X.",
"2.22.22.22.",
".22.22.22.2",
"X..X..X..X.",
"2.22.22.22.",
".22.22.22.2",
],

// ── 87 · Cuatro salas ──
[
"22222.22222",
"22222.22222",
"22222.22222",
"...........",
"XXXXX.XXXXX",
"...........",
"22222.22222",
"22222.22222",
"22222.22222",
],

// ── 88 · Escalera al cielo ──
[
"ccc.....222",
"XXX.....XXX",
"...cc.22...",
"...XX.XX...",
".....3.....",
"....333....",
"...........",
"3.3.3.3.3.3",
"33333333333",
"33333333333",
],

// ── 89 · La telaraña ──
[
"2....2....2",
".2...2...2.",
"..2.222.2..",
"...22222...",
"22222322222",
"...22222...",
"..2.222.2..",
".2...2...2.",
"2....2....2",
"...........",
"3.3.3.3.3.3",
],

// ── 90 · La gran muralla ──
[
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"X.XXXXXXXXX",
"33333333333",
"...........",
"XXXXXXXXX.X",
"33333333333",
"...........",
"XXXX.XXXXXX",
"33333333333",
"...........",
"o.o.o.o.o.o",
"ooooooooooo",
],

// ── 91 · Lluvia pesada ──
[
"2r2r2r2r2r2",
"rrrrrrrrrrr",
"o2o2o2o2o2o",
"ooooooooooo",
"2y2y2y2y2y2",
"yyyyyyyyyyy",
"g2g2g2g2g2g",
"ggggggggggg",
"...........",
"3.3.3.3.3.3",
],

// ── 92 · Doble núcleo ──
[
"33333.33333",
"3vvv3.3vvv3",
"3v2v3.3v2v3",
"3vvv3.3vvv3",
"33333.33333",
"...........",
"XX...X...XX",
"o2o2o2o2o2o",
"ooooooooooo",
],

// ── 93 · La matriz ──
[
"3.3.3.3.3.3",
".X.X.X.X.X.",
"3.3.3.3.3.3",
".X.X.X.X.X.",
"3.3.3.3.3.3",
".X.X.X.X.X.",
"3.3.3.3.3.3",
"...........",
"ggggggggggg",
"ggggggggggg",
],

// ── 94 · Los tres jefes ──
[
"2.2.2.2.2.2",
"...........",
".v...v...v.",
"vvv.vvv.vvv",
"v.v.v.v.v.v",
"vvv.vvv.vvv",
"...........",
"33333333333",
"o.o.o.o.o.o",
"ooooooooooo",
],

// ── 95 · El muro final ──
[
"ooooooooooo",
"33333333333",
"22222222222",
"33333333333",
"...........",
"X.XXX.XXX.X",
"...........",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"2.2.2.2.2.2",
],

// ── 96 · Colmena suprema ──
[
".33.33.33.3",
"3.33.33.33.",
".22.22.22.2",
"2.22.22.22.",
".33.33.33.3",
"p.pp.pp.pp.",
".pp.pp.pp.p",
"...........",
"yyyyyyyyyyy",
],

// ── 97 · Laberinto carmesí ──
[
"rrrrrrrrrrr",
"r3r3r3r3r3r",
"rrrrrrrrrrr",
"X.XXXXXXX.X",
"...........",
"33.33333.33",
"...........",
"XXXX.X.XXXX",
"...........",
"rrrrrrrrrrr",
"r2r2r2r2r2r",
"rrrrrrrrrrr",
],

// ── 98 · La cripta ──
[
"22222222222",
"23333333332",
"23v3v3v3v32",
"23333333332",
"22222222222",
"...........",
"X..X...X..X",
"p.p.p.p.p.p",
"ppppppppppp",
],

// ── 99 · La antesala ──
[
".....3.....",
"....323....",
"...32223...",
"..3222223..",
".322222223.",
"3222vvv2223",
".322222223.",
"..3222223..",
"...32223...",
"....323....",
".....3.....",
"...........",
"X....X....X",
],

// ── 100 · EL FINAL ──
[
"3.3.3.3.3.3",
"33333333333",
"3vvvvvvvvv3",
"3v2222222v3",
"3v2ppppp2v3",
"3v2p3X3p2v3",
"3v2ppppp2v3",
"3v2222222v3",
"3vvvvvvvvv3",
"33333333333",
"...........",
"X..X...X..X",
"33.33.33.33",
"rrrrrrrrrrr",
],

// ═══════════ EL ULTRAMUNDO (101-120) ═══════════

// ── 101 · Compuertas ──
[
"33.33333.33",
"vvvvvvvvvvv",
"..X.....X..",
"yyyy222yyyy",
"oooo222oooo",
"..X.....X..",
"ggggg2ggggg",
"22222.22222",
"..X.....X..",
"rrrrrrrrrrr",
"22222222222",
],

// ── 102 · Colmena ──
[
".22.222.22.",
"y33y333y33y",
"yyyyyyyyyyy",
"o22o222o22o",
"ooooooooooo",
"g22g222g22g",
"ggggggggggg",
"2.2.2.2.2.2",
".3.3.3.3.3.",
],

// ── 103 · Serpiente ──
[
"3333333333.",
"..........v",
".vvvvvvvvvv",
"v..........",
".3333333333",
"..........v",
".vvvvvvvvvv",
"v..........",
"22222222222",
"ooooooooooo",
],

// ── 104 · El Núcleo ──
[
"rrrrrrrrrrr",
"22222222222",
"2.........2",
"2..33333..2",
"2..3ppp3..2",
"2..33333..2",
"2.X.....X.2",
"2.........2",
"22222222222",
"rrrrrrrrrrr",
],

// ── 105 · Tenazas ──
[
"33.......33",
"333.....333",
"3333...3333",
"22222.22222",
".2222.2222.",
"..222.222..",
"ooooooooooo",
"ooooooooooo",
"vvvvvvvvvvv",
],

// ── 106 · Damero de acero ──
[
"2y2y2y2y2y2",
"y2y2y2y2y2y",
"2y2y2y2y2y2",
"y3y3y3y3y3y",
"3y3y3y3y3y3",
"y3y3y3y3y3y",
"2o2o2o2o2o2",
"o2o2o2o2o2o",
],

// ── 107 · Doble muralla ──
[
"X.X.X.X.X.X",
"33333333333",
"33333333333",
"...........",
"X.X.X.X.X.X",
"22222222222",
"22222222222",
"...........",
"rrrrrrrrrrr",
"ooooooooooo",
"yyyyyyyyyyy",
],

// ── 108 · Anillos ──
[
"33333333333",
"3.........3",
"3.2222222.3",
"3.2.....2.3",
"3.2.ppp.2.3",
"3.2.....2.3",
"3.2222222.3",
"3.........3",
"33333333333",
],

// ── 109 · Calavera ──
[
"...22222...",
"..2222222..",
".222222222.",
".22.222.22.",
".222222222.",
"..22.2.22..",
"...2.2.2...",
"22222222222",
"yyyyyyyyyyy",
"ooooooooooo",
"ooooooooooo",
],

// ── 110 · Fortaleza Omega ──
[
"X2X2X2X2X2X",
"22222222222",
"33333333333",
"33333333333",
"22222222222",
"X.........X",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"22222222222",
],

// ── 111 · Campo minado ──
[
"3.3.3.3.3.3",
".2.2.2.2.2.",
"3.3.3.3.3.3",
".2.2.2.2.2.",
"3.3.3.3.3.3",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
"22222222222",
"ooooooooooo",
"ooooooooooo",
],

// ── 112 · Catacumbas ──
[
"X.X.X.X.X.X",
"333.333.333",
"2.2.2.2.2.2",
"333.333.333",
"2.2.2.2.2.2",
"X.X.X.X.X.X",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"22222222222",
"yyyyyyyyyyy",
],

// ── 113 · Doble hélice ──
[
"33.......33",
".33.....33.",
"..33...33..",
"...33.33...",
"....333....",
"...33.33...",
"..33...33..",
".33.....33.",
"33.......33",
"22222222222",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
],

// ── 114 · La Jaula ──
[
"X.X.X.X.X.X",
".3.3.3.3.3.",
"X.X.X.X.X.X",
".3.3.3.3.3.",
"X.X.X.X.X.X",
"33333333333",
"33333333333",
"22222222222",
"ooooooooooo",
"ooooooooooo",
"yyyyyyyyyyy",
],

// ── 115 · Avispero ──
[
"y3y3y3y3y3y",
"3y3y3y3y3y3",
"y3y3y3y3y3y",
"3y3y3y3y3y3",
"22222222222",
".2.2.2.2.2.",
"ooooooooooo",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
],

// ── 116 · Trincheras ──
[
"33333333333",
"...........",
"22222222222",
"...........",
"33333333333",
"...........",
"22222222222",
"rrrrrrrrrrr",
"ooooooooooo",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
],

// ── 117 · Corona ──
[
"3....3....3",
"33..333..33",
"333.333.333",
"33333333333",
"22222222222",
"22222222222",
"ppppppppppp",
"ppppppppppp",
"yyyyyyyyyyy",
],

// ── 118 · Búnker ──
[
"X2X2X2X2X2X",
"23232323232",
"32323232323",
"X.........X",
"33333333333",
"22222222222",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"ooooooooooo",
"yyyyyyyyyyy",
],

// ── 119 · Antesala ──
[
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"...........",
"22222222222",
"2.2.2.2.2.2",
"22222222222",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
],

// ── 120 · El Guardián ──
[
"X3X3X3X3X3X",
"33333333333",
"23232323232",
"32323232323",
"X.X.....X.X",
"rrrrrrrrrrr",
"22222222222",
"ooooooooooo",
"22222222222",
"yyyyyyyyyyy",
],

// ═══════════ LA FORJA Y EL ABISMO (121-140) ═══════════

// ── 121 · El Yunque ──
[
"33333333333",
".333333333.",
"...33333...",
"....333....",
"...33333...",
".333333333.",
"ooooooooooo",
"ooooooooooo",
"rrrrrrrrrrr",
],

// ── 122 · Chispas ──
[
"3.3.3.3.3.3",
".3.3.3.3.3.",
"3.3.3.3.3.3",
".3.3.3.3.3.",
"3.3.3.3.3.3",
"yyyyyyyyyyy",
"ooooooooooo",
"22222222222",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 123 · El Crisol ──
[
"33.......33",
"33.ooooo.33",
"33ooooooo33",
"33222222233",
".333333333.",
"..3333333..",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
"22222222222",
],

// ── 124 · Martillos ──
[
"3333...3333",
"3333...3333",
"..33...33..",
"..33...33..",
"..33...33..",
"22222222222",
"ooooooooooo",
"22222222222",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 125 · Lingotes ──
[
"222.222.222",
"333.333.333",
"222.222.222",
"333.333.333",
"yyy.yyy.yyy",
"ooo.ooo.ooo",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"ooooooooooo",
"22222222222",
],

// ── 126 · La Fragua ──
[
"X.X.X.X.X.X",
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"X.X.X.X.X.X",
"ooooooooooo",
"ooooooooooo",
"22222222222",
"rrrrrrrrrrr",
"22222222222",
],

// ── 127 · Engranajes ──
[
"..33...33..",
".3333.3333.",
".3223.3223.",
".3333.3333.",
"..33...33..",
"22222222222",
"22222222222",
"ooooooooooo",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 128 · Estratos ──
[
".3.3.3.3.3.",
"33333333333",
"22222222222",
"33333333333",
"22222222222",
"vvvvvvvvvvv",
"ppppppppppp",
"rrrrrrrrrrr",
"ooooooooooo",
],

// ── 129 · El Horno ──
[
"XX.......XX",
"3.rrrrrrr.3",
"3.rooooor.3",
"3.ryyyyyr.3",
"3.rooooor.3",
"3.rrrrrrr.3",
"3.........3",
"33333333333",
"33333333333",
"22222222222",
"yyyyyyyyyyy",
],

// ── 130 · El Herrero ──
[
"X3X3X3X3X3X",
"33333333333",
"32323232323",
"23232323232",
"33333333333",
"X....X....X",
"rrrrrrrrrrr",
"22222222222",
"ooooooooooo",
"yyyyyyyyyyy",
],

// ── 131 · Estalactitas ──
[
"33333333333",
"3.333.333.3",
"3.3.3.3.3.3",
".3...3...3.",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
"22222222222",
"22222222222",
"rrrrrrrrrrr",
"ooooooooooo",
],

// ── 132 · Cuevas ──
[
"22222222222",
"33333333333",
"X.X.X.X.X.X",
"333.333.333",
"333.333.333",
"X.X.X.X.X.X",
"22222222222",
"ppppppppppp",
"ppppppppppp",
"rrrrrrrrrrr",
"ooooooooooo",
],

// ── 133 · Cristales ──
[
".3...3...3.",
"333.333.333",
".3...3...3.",
"v3v.v3v.v3v",
"vvvvvvvvvvv",
"22222222222",
"33333333333",
"ooooooooooo",
"ooooooooooo",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 134 · El Puente ──
[
"33333333333",
"33333333333",
"X....X....X",
"..2..2..2..",
"..2..2..2..",
"33333333333",
"22222222222",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"ooooooooooo",
"yyyyyyyyyyy",
],

// ── 135 · Las Columnas ──
[
"33.33.33.33",
"33.33.33.33",
"33.33.33.33",
"33.33.33.33",
"ooooooooooo",
"ooooooooooo",
"22222222222",
"22222222222",
"rrrrrrrrrrr",
],

// ── 136 · Telaraña de acero ──
[
"3.3.3.3.3.3",
".323232323.",
"3.3.3.3.3.3",
".323232323.",
"3.3.3.3.3.3",
"22222222222",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
"ooooooooooo",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 137 · La Bóveda ──
[
"...33333...",
".333333333.",
"33322222333",
"22222222222",
"33333333333",
"22222222222",
"ppppppppppp",
"rrrrrrrrrrr",
"ooooooooooo",
],

// ── 138 · Laberinto ígneo ──
[
"X.X.X.X.X.X",
"3333.333333",
"2.2.2.2.2.2",
"333333.3333",
"2.2.2.2.2.2",
"3333.333333",
"X.X.X.X.X.X",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"ooooooooooo",
"22222222222",
"yyyyyyyyyyy",
],

// ── 139 · Puerta del Abismo ──
[
"33X33333X33",
"33X33333X33",
"33.33333.33",
"22.22222.22",
"22.22222.22",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
"22222222222",
"rrrrrrrrrrr",
"ooooooooooo",
],

// ── 140 · El Coloso ──
[
"X333333333X",
"33333333333",
"32323232323",
"23232323232",
"33333333333",
"X.X.....X.X",
"22222222222",
"rrrrrrrrrrr",
"ooooooooooo",
"yyyyyyyyyyy",
],

// ═══════════ EL REINO HELADO (141-160) ═══════════

// ── 141 · Escarcha ──
[
"c.c.c.c.c.c",
"3c3c3c3c3c3",
"c3c3c3c3c3c",
"3c3c3c3c3c3",
"c.c.c.c.c.c",
"22222222222",
"33333333333",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
"22222222222",
],

// ── 142 · Carámbanos ──
[
"33333333333",
"33333333333",
"3.3.3.3.3.3",
"3.3.3.3.3.3",
".3...3...3.",
".3...3...3.",
"ccccccccccc",
"ccccccccccc",
"22222222222",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
],

// ── 143 · Iceberg ──
[
"....333....",
"...33333...",
"..3333333..",
".333333333.",
"33333333333",
"2c2c2c2c2c2",
"c2c2c2c2c2c",
"22222222222",
"ccccccccccc",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
],

// ── 144 · La Grieta ──
[
"33333.33333",
"3333...3333",
"333.....333",
"33.......33",
"333.....333",
"3333...3333",
"33333.33333",
"22222222222",
"ccccccccccc",
],

// ── 145 · Ventisca ──
[
"3.2.3.2.3.2",
".2.3.2.3.2.",
"3.2.3.2.3.2",
".2.3.2.3.2.",
"3.2.3.2.3.2",
"ccccccccccc",
"ccccccccccc",
"33333333333",
"22222222222",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"22222222222",
],

// ── 146 · El Espejo ──
[
"33333333333",
"3.........3",
"3.3333333.3",
"3.3c3c3c3.3",
"3.3333333.3",
"3.........3",
"33333333333",
"22222222222",
"vvvvvvvvvvv",
"ppppppppppp",
],

// ── 147 · Agujas de hielo ──
[
"3.3.3.3.3.3",
"3.3.3.3.3.3",
"3.3.3.3.3.3",
"3.3.3.3.3.3",
"33333333333",
"33333333333",
"ccccccccccc",
"ccccccccccc",
"22222222222",
"bbbbbbbbbbb",
],

// ── 148 · Aurora ──
[
"vvvvvvvvvvv",
"pvpvpvpvpvp",
"vpvpvpvpvpv",
"ccccccccccc",
"33333333333",
"33333333333",
"33333333333",
"22222222222",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
],

// ── 149 · Témpanos ──
[
"333.333.333",
"333.333.333",
"333.333.333",
"...........",
"22222222222",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"33333333333",
],

// ── 150 · La Reina del Hielo ──
[
"X3X3X3X3X3X",
"33333333333",
"3c3c3c3c3c3",
"c3c3c3c3c3c",
"33333333333",
"X....X....X",
"22222222222",
"33333333333",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
"ppppppppppp",
],

// ── 151 · Noche polar ──
[
"vvvvvvvvvvv",
"3v3v3v3v3v3",
"v3v3v3v3v3v",
"3v3v3v3v3v3",
"vvvvvvvvvvv",
"22222222222",
"33333333333",
"22222222222",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"ccccccccccc",
],

// ── 152 · El Glaciar ──
[
"33333333333",
"33333333333",
"22222222222",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"ccccccccccc",
"33333333333",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
],

// ── 153 · Colmillos ──
[
"33.33.33.33",
"33.33.33.33",
"33.33.33.33",
"22222222222",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"33333333333",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
],

// ── 154 · El Laberinto blanco ──
[
"X.X.X.X.X.X",
"33333.33333",
"2.2.2.2.2.2",
"33.3333.333",
"2.2.2.2.2.2",
"33333.33333",
"X.X.X.X.X.X",
"ccccccccccc",
"ccccccccccc",
"22222222222",
"bbbbbbbbbbb",
"33333333333",
],

// ── 155 · Cristal profundo ──
[
"....333....",
"...3ccc3...",
"..3ccccc3..",
".3ccccccc3.",
"3ccccccccc3",
".3ccccccc3.",
"..3ccccc3..",
"...3ccc3...",
"....333....",
"33333333333",
"22222222222",
"22222222222",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
],

// ── 156 · Avalancha ──
[
"33333333333",
"33333333333",
"33333333333",
"2.2.2.2.2.2",
".2.2.2.2.2.",
"2.2.2.2.2.2",
"ccccccccccc",
"ccccccccccc",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"22222222222",
"vvvvvvvvvvv",
],

// ── 157 · El Espinazo ──
[
"3.3.3.3.3.3",
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"ccccccccccc",
"22222222222",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
],

// ── 158 · Fortaleza glacial ──
[
"X2X2X2X2X2X",
"22222222222",
"33333333333",
"3ccccccccc3",
"3c3333333c3",
"3ccccccccc3",
"33333333333",
"22222222222",
"X.........X",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
],

// ── 159 · La Antesala Blanca ──
[
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"...........",
"33333333333",
"2.2.2.2.2.2",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"bbbbbbbbbbb",
"bbbbbbbbbbb",
"22222222222",
],

// ── 160 · El Corazón de Hielo ──
[
"X3X3X3X3X3X",
"33333333333",
"3c3c3c3c3c3",
"33c33333c33",
"3c3c3c3c3c3",
"33333333333",
"X.X.....X.X",
"22222222222",
"ccccccccccc",
"bbbbbbbbbbb",
"vvvvvvvvvvv",
"ppppppppppp",
],

// ═══════════ LA CIÉNAGA (161-180) ═══════════

// ── 161 · La Ciénaga ──
[
"ggggggggggg",
"g3g3g3g3g3g",
"3g3g3g3g3g3",
"g3g3g3g3g3g",
"ggggggggggg",
"22222222222",
"33333333333",
"ccccccccccc",
"ccccccccccc",
"22222222222",
"ggggggggggg",
"yyyyyyyyyyy",
],

// ── 162 · Raíces ──
[
"33333333333",
"3.3.3.3.3.3",
"3.3.3.3.3.3",
".3.3.3.3.3.",
".3.3.3.3.3.",
"ggggggggggg",
"ggggggggggg",
"22222222222",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"33333333333",
],

// ── 163 · El Pantano ──
[
"g.g.g.g.g.g",
"3333.3.3333",
"22222222222",
"3333.3.3333",
"22222222222",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
"ccccccccccc",
"33333333333",
"22222222222",
"yyyyyyyyyyy",
],

// ── 164 · Lianas ──
[
"3.3.3.3.3.3",
"3.3.3.3.3.3",
"3g3g3g3g3g3",
"3.3.3.3.3.3",
"3g3g3g3g3g3",
"3.3.3.3.3.3",
"ggggggggggg",
"22222222222",
"22222222222",
"22222222222",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
],

// ── 165 · El Ojo del pantano ──
[
"..3333333..",
".333333333.",
"33gg333gg33",
"33333y33333",
".333333333.",
"..3333333..",
"22222222222",
"22222222222",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
],

// ── 166 · Esporas ──
[
".3.3.3.3.3.",
"3.3.3.3.3.3",
".3.3.3.3.3.",
"3.3.3.3.3.3",
".3.3.3.3.3.",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
"22222222222",
"22222222222",
"ggggggggggg",
"ggggggggggg",
"33333333333",
"ccccccccccc",
],

// ── 167 · El Sauce ──
[
"....333....",
"..3333333..",
".333333333.",
"3g3g3g3g3g3",
"g3g.g3g.g3g",
".g...g...g.",
".g...g...g.",
"22222222222",
"22222222222",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
"yyyyyyyyyyy",
],

// ── 168 · Colmena verde ──
[
"g33g333g33g",
"ggggggggggg",
"g33g333g33g",
"ggggggggggg",
"33333333333",
"22222222222",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"33333333333",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
],

// ── 169 · El Cementerio ──
[
".33.333.33.",
".33.333.33.",
".33.333.33.",
"...........",
"22222222222",
"22222222222",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"vvvvvvvvvvv",
"vvvvvvvvvvv",
"33333333333",
"ccccccccccc",
],

// ── 170 · El Señor del Pantano ──
[
"X3X3X3X3X3X",
"33333333333",
"3g3g3g3g3g3",
"g3g3g3g3g3g",
"33333333333",
"X....X....X",
"22222222222",
"33333333333",
"ggggggggggg",
"ccccccccccc",
"22222222222",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
],

// ── 171 · Niebla ──
[
"2.2.2.2.2.2",
".3.3.3.3.3.",
"2.2.2.2.2.2",
".3.3.3.3.3.",
"2.2.2.2.2.2",
"33333333333",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"vvvvvvvvvvv",
"22222222222",
],

// ── 172 · Las Fauces ──
[
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"...........",
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"22222222222",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
],

// ── 173 · El Nido ──
[
"..33...33..",
".3223.3223.",
".3333.3333.",
"..33...33..",
"33333333333",
"22222222222",
"22222222222",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
"ccccccccccc",
],

// ── 174 · Espinas ──
[
"3.3.3.3.3.3",
"33.33.33.33",
"3.3.3.3.3.3",
"33.33.33.33",
"3.3.3.3.3.3",
"22222222222",
"22222222222",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
],

// ── 175 · El Altar hundido ──
[
"...33333...",
"..3333333..",
".333333333.",
"33333333333",
"X....X....X",
"22222222222",
"22222222222",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
"ccccccccccc",
"yyyyyyyyyyy",
],

// ── 176 · Enjambre ──
[
"3y3.3y3.3y3",
"y3y.y3y.y3y",
"3y3.3y3.3y3",
"y3y.y3y.y3y",
"33333333333",
"33333333333",
"22222222222",
"22222222222",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
],

// ── 177 · El Templo verde ──
[
"....333....",
"...33333...",
"..3g3g3g3..",
".333333333.",
"3g3g3g3g3g3",
"33333333333",
"22222222222",
"22222222222",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"ccccccccccc",
"yyyyyyyyyyy",
],

// ── 178 · Ruinas ahogadas ──
[
"33.33.33.33",
"33.33.33.33",
"33.33.33.33",
"33333333333",
"22222222222",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"vvvvvvvvvvv",
],

// ── 179 · La Puerta de Musgo ──
[
"33X33333X33",
"33X33333X33",
"33.33333.33",
"22.22222.22",
"22.22222.22",
"33333333333",
"ggggggggggg",
"ggggggggggg",
"22222222222",
"ccccccccccc",
"ccccccccccc",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
],

// ── 180 · Behemot ──
[
"X333333333X",
"33333333333",
"3g3g3g3g3g3",
"g3g3g3g3g3g",
"33333333333",
"X.X.....X.X",
"22222222222",
"33333333333",
"ggggggggggg",
"22222222222",
"ccccccccccc",
"vvvvvvvvvvv",
"yyyyyyyyyyy",
],

// ═══════════ EL TEMPLO PERDIDO (181-200) ═══════════

// ── 181 · Las Escaleras ──
[
"3.........3",
"33.......33",
"333.....333",
"3333...3333",
"33333.33333",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"22222222222",
"22222222222",
"ooooooooooo",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
"22222222222",
],

// ── 182 · El Ídolo ──
[
"...33333...",
"..3y3y3y3..",
"..3yyyyy3..",
"..3y3y3y3..",
"...33333...",
"....333....",
"33333333333",
"22222222222",
"22222222222",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"ooooooooooo",
"33333333333",
"22222222222",
],

// ── 183 · Jeroglíficos ──
[
"y3y3y3y3y3y",
"33333333333",
"y.y.y.y.y.y",
"33333333333",
"y3y3y3y3y3y",
"22222222222",
"22222222222",
"ooooooooooo",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
"ppppppppppp",
],

// ── 184 · La Serpiente Dorada ──
[
"3333333333.",
"..........y",
".yyyyyyyyyy",
"y..........",
".3333333333",
"..........y",
".yyyyyyyyyy",
"y..........",
".3333333333",
"22222222222",
"22222222222",
"33333333333",
"33333333333",
"33333333333",
],

// ── 185 · Las Columnas del Sol ──
[
"3y3.3y3.3y3",
"3y3.3y3.3y3",
"3y3.3y3.3y3",
"3y3.3y3.3y3",
"33333333333",
"22222222222",
"22222222222",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"ooooooooooo",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
],

// ── 186 · El Sarcófago ──
[
"33333333333",
"3yyyyyyyyy3",
"3y3333333y3",
"3y3o3o3o3y3",
"3y3333333y3",
"3yyyyyyyyy3",
"33333333333",
"22222222222",
"22222222222",
"ooooooooooo",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 187 · La Cámara del Tesoro ──
[
"X.X.X.X.X.X",
"yyyyyyyyyyy",
"y3y3y3y3y3y",
"yyyyyyyyyyy",
"X.X.X.X.X.X",
"33333333333",
"33333333333",
"22222222222",
"22222222222",
"ooooooooooo",
"22222222222",
"rrrrrrrrrrr",
"33333333333",
"22222222222",
],

// ── 188 · Trampas ──
[
"2X2X2X2X2X2",
"33333333333",
"2.2.2.2.2.2",
"33333333333",
"2.2.2.2.2.2",
"33333333333",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"22222222222",
"ooooooooooo",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 189 · El Obelisco ──
[
"....333....",
"....333....",
"...33333...",
"...33333...",
"..3333333..",
"..3333333..",
".333333333.",
"33333333333",
"22222222222",
"22222222222",
"yyyyyyyyyyy",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
],

// ── 190 · El Guardián del Templo ──
[
"X3X3X3X3X3X",
"33333333333",
"3y3y3y3y3y3",
"y3y3y3y3y3y",
"33333333333",
"X....X....X",
"22222222222",
"33333333333",
"yyyyyyyyyyy",
"22222222222",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
],

// ── 191 · La Antecámara ──
[
"33333333333",
"3.3.3.3.3.3",
"33333333333",
"...........",
"33333333333",
"2.2.2.2.2.2",
"22222222222",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"ooooooooooo",
"ooooooooooo",
"33333333333",
"22222222222",
"rrrrrrrrrrr",
],

// ── 192 · Los Chacales ──
[
"33...3...33",
"333.333.333",
"333.333.333",
"33...3...33",
"22222222222",
"22222222222",
"33333333333",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"ooooooooooo",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
"ppppppppppp",
],

// ── 193 · El Pozo ──
[
"33333333333",
"3.........3",
"3.3333333.3",
"3.3.....3.3",
"3.3.222.3.3",
"3.3.....3.3",
"3.3333333.3",
"3.........3",
"33333333333",
"22222222222",
"22222222222",
"yyyyyyyyyyy",
"ooooooooooo",
"33333333333",
],

// ── 194 · Escamas de oro ──
[
"y3y3y3y3y3y",
"3y3y3y3y3y3",
"y3y3y3y3y3y",
"3y3y3y3y3y3",
"y3y3y3y3y3y",
"22222222222",
"22222222222",
"33333333333",
"ooooooooooo",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
"yyyyyyyyyyy",
],

// ── 195 · La Balanza ──
[
"333.....333",
"3.3.....3.3",
"3.3.....3.3",
"333.....333",
"....333....",
"...33333...",
"33333333333",
"22222222222",
"22222222222",
"22222222222",
"22222222222",
"33333333333",
"ooooooooooo",
"rrrrrrrrrrr",
],

// ── 196 · El Laberinto de Oro ──
[
"X.X.X.X.X.X",
"333333.3333",
"2.2.2.2.2.2",
"3333.333333",
"2.2.2.2.2.2",
"333333.3333",
"X.X.X.X.X.X",
"yyyyyyyyyyy",
"22222222222",
"22222222222",
"33333333333",
"22222222222",
"33333333333",
"rrrrrrrrrrr",
],

// ── 197 · Los Colosos Gemelos ──
[
"333.....333",
"3y3.....3y3",
"333.....333",
"333.....333",
"33333333333",
"33333333333",
"22222222222",
"22222222222",
"yyyyyyyyyyy",
"ooooooooooo",
"33333333333",
"33333333333",
],

// ── 198 · El Ocaso ──
[
"ooooooooooo",
"oyoyoyoyoyo",
"yoyoyoyoyoy",
"33333333333",
"33333333333",
"22222222222",
"22222222222",
"33333333333",
"rrrrrrrrrrr",
"rrrrrrrrrrr",
"33333333333",
"22222222222",
"yyyyyyyyyyy",
],

// ── 199 · La Última Puerta ──
[
"33X33333X33",
"33X33333X33",
"33X33333X33",
"33.33333.33",
"22.22222.22",
"22.22222.22",
"33333333333",
"yyyyyyyyyyy",
"yyyyyyyyyyy",
"22222222222",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
],

// ── 200 · EL TEMPLO ──
[
"X3X3X3X3X3X",
"33333333333",
"3y3y3y3y3y3",
"y3y3y3y3y3y",
"3y3y3y3y3y3",
"33333333333",
"X.X.....X.X",
"22222222222",
"33333333333",
"yyyyyyyyyyy",
"22222222222",
"ooooooooooo",
"33333333333",
"rrrrrrrrrrr",
],
];
