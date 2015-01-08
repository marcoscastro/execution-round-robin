var circulos; // array dos círculos (processos)
var valores_circulos; // array com os valores dos círculos (processos)
var quantum; // variável que guarda o valor do quantum
var texto_div_quantum; // texto da div_quantum
var processo_corrente; // variável que guarda o processo corrente
var ant_processo_corrente; // variável que guarda o processo anterior
var timer; // timer que controla o intervalo de tempo entre as chamadas
var textos_processos; // texto da div_cpu
var div_fila; // manipula a div_fila
var div_cpu; // manipula a div_cpu
var trocas_contexto; // controla a quantidade de trocas de contexto
var fila; // array que simula uma fila

function inicio() {
	// cria novos arrays
	circulos = new Array();
	valores_circulos = new Array();
	fila = new Array();
	// gera um número de 1 a 9
	quantum = obterNumeroRand(1, 9);
	// inicializa as variáveis com 0
	processo_corrente = 0;
	ant_processo_corrente = 0;
	trocas_contexto = 0;
	// texto para modificar a div_quantum
	texto_div_quantum = "<h2>Time Quantum: " + quantum + "</h2>";
	// modifica o valor da div_quantum
	document.getElementById("div_quantum").innerHTML=texto_div_quantum;
	// obtém as div_fila e div_cpu
	div_fila = document.getElementById("div_fila");
	div_cpu = document.getElementById("div_cpu");

	// preenche a fila
	for(var i = 0; i < 5; i++)
		fila.push(i);

	// chama a função para desenhar o canvas
	desenharCirculos();
}

// função que desenha todos os círculos
function desenharCirculos() {
	// obtém o elemento cujo ID é "canvas_animacao"
	var canvas = document.getElementById("canvas_animacao");
	// variáveis dos círculos que representam os processos
	var c1, c2, c3, c4, c5;
	var num_rand;

	// desenhando todo os círculos

	// retorna o objeto que fornece métodos e propridades para desenhar no canvas
	c1 = canvas.getContext("2d");
	// inicia o path
	c1.beginPath();
	// cria um arco (curva)
	// parâmetros: coordenada x, coordenada y, raio do círculo, ângulo inicial, ângulo final
	c1.arc(400,100,50,0,2*Math.PI);
	// seta a fonte
	c1.font = "50px Arial";
	// obtém um número randômico que é o tempo de execução do processo
	num_rand = obterNumeroRand(1, 9);
	valores_circulos.push(num_rand);
	// preenche o círculo com um número
	c1.fillText(num_rand, 385, 120);
	// largura da borda
	c1.lineWidth = 5;
	// desenha o que foi configurado
	c1.stroke();

	c2 = canvas.getContext("2d");
	c2.beginPath();
	c2.arc(680,230,50,0,2*Math.PI);
	c2.font = "50px Arial";
	num_rand = obterNumeroRand(1, 9);
	valores_circulos.push(num_rand);
	c2.fillText(num_rand, 665, 250);
	c2.lineWidth = 5;
	c2.stroke();

	c3 = canvas.getContext("2d");
	c3.beginPath();
	c3.arc(620,500,50,0,2*Math.PI);
	c3.font = "50px Arial";
	num_rand = obterNumeroRand(1, 9);
	valores_circulos.push(num_rand);
	c3.fillText(num_rand, 605, 520);
	c3.lineWidth = 5;
	c3.stroke();

	c4 = canvas.getContext("2d");
	c4.beginPath();
	c4.arc(180,500,50,0,2*Math.PI);
	c4.font = "50px Arial";
	num_rand = obterNumeroRand(1, 9);
	valores_circulos.push(num_rand);
	c4.fillText(num_rand, 165, 520);
	c4.lineWidth = 5;
	c4.stroke();

	c5 = canvas.getContext("2d");
	c5.beginPath();
	c5.arc(120,230,50,0,2*Math.PI);
	c5.font = "50px Arial";
	num_rand = obterNumeroRand(1, 9);
	valores_circulos.push(num_rand);
	c5.fillText(num_rand, 105, 250);
	c5.lineWidth = 5;
	c5.stroke();

	// desenha os textos para identificar os processos
	textos_processos = canvas.getContext("2d");
	textos_processos.beginPath();
	textos_processos.font = "35px Times";
	textos_processos.fillText("P1", 380, 40);
	textos_processos.fillText("P2", 660, 170);
	textos_processos.fillText("P3", 600, 440);
	textos_processos.fillText("P4", 160, 440);
	textos_processos.fillText("P5", 100, 170);
	textos_processos.stroke();

	// adicionando na lista todos os círculos
	// adicionada na ordem para ficar em sentido-horário (fila circular)
	circulos.push(c1);
	circulos.push(c2);
	circulos.push(c3);
	circulos.push(c4);
	circulos.push(c5);

	// verifica quanto tempo o processo ficará com a CPU
	if(valores_circulos[0] >= quantum)
		timer = setInterval(executar, quantum * 1000);
	else
		timer = setInterval(executar, valores_circulos[0] * 1000);
}

// função que obtém número randômico num intervalo
function obterNumeroRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// função que atualiza o canvas
function atualizarCanvas(processo_corrente) {

	// desenha os círculos

	circulos[0].beginPath();
	circulos[0].arc(400,100,50,0,2*Math.PI);
	circulos[0].font = "50px Arial";
	if(processo_corrente == 0) {
		circulos[0].fillStyle = "red";
		circulos[0].strokeStyle= "red";
	} else {
		circulos[0].fillStyle = "black";
		circulos[0].strokeStyle= "black";
	}
	circulos[0].fillText(valores_circulos[0], 385, 120);
	circulos[0].lineWidth = 5;
	circulos[0].stroke();

	circulos[1].beginPath();
	circulos[1].arc(680,230,50,0,2*Math.PI);
	circulos[1].font = "50px Arial";
	if(processo_corrente == 1) {
		circulos[1].fillStyle = "red";
		circulos[1].strokeStyle= "red";
	} else {
		circulos[1].fillStyle = "black";
		circulos[1].strokeStyle= "black";
	}
	circulos[1].fillText(valores_circulos[1], 665, 250);
	circulos[1].lineWidth = 5;
	circulos[1].stroke();

	circulos[2].beginPath();
	circulos[2].arc(620,500,50,0,2*Math.PI);
	circulos[2].font = "50px Arial";
	if(processo_corrente == 2) {
		circulos[2].fillStyle = "red";
		circulos[2].strokeStyle= "red";
	} else {
		circulos[2].fillStyle = "black";
		circulos[2].strokeStyle= "black";
	}
	circulos[2].fillText(valores_circulos[2], 605, 520);
	circulos[2].lineWidth = 5;
	circulos[2].stroke();

	circulos[3].beginPath();
	circulos[3].arc(180,500,50,0,2*Math.PI);
	circulos[3].font = "50px Arial";
	if(processo_corrente == 3) {
		circulos[3].fillStyle = "red";
		circulos[3].strokeStyle= "red";
	} else {
		circulos[3].fillStyle = "black";
		circulos[3].strokeStyle= "black";
	}
	circulos[3].fillText(valores_circulos[3], 165, 520);
	circulos[3].lineWidth = 5;
	circulos[3].stroke();

	circulos[4].beginPath();
	circulos[4].arc(120,230,50,0,2*Math.PI);
	circulos[4].font = "50px Arial";
	if(processo_corrente == 4) {
		circulos[4].fillStyle = "red";
		circulos[4].strokeStyle= "red";
	} else {
		circulos[4].fillStyle = "black";
		circulos[4].strokeStyle= "black";
	}
	circulos[4].fillText(valores_circulos[4], 105, 250);
	circulos[4].lineWidth = 5;
	circulos[4].stroke();

	textos_processos.beginPath();
	textos_processos.font = "35px Times";
	textos_processos.fillStyle = "black";
	textos_processos.fillText("P1", 380, 40);
	textos_processos.fillText("P2", 660, 170);
	textos_processos.fillText("P3", 600, 440);
	textos_processos.fillText("P4", 160, 440);
	textos_processos.fillText("P5", 100, 170);
	textos_processos.stroke();
}

// função que selerecionar o circulo para que ele fique visível na animação
function executar() {

	// limpa o timer
	clearInterval(timer);

	if(!processosFinalizados()) {

		var processo_escolhido = processo_corrente;

		// se for 0 (processo já finalizado), escolhe outro processo
		if(valores_circulos[processo_escolhido] == 0)
		{
			// se for 0, então remove da fila
			var indice_elem = fila.indexOf(processo_escolhido);
			// verifica se o elemento existe na fila
			if(indice_elem != -1) {
				fila.splice(indice_elem, 1);
			}

			var escolhido = false;

			// o "i" começa do processo posterior
			for(var i = processo_escolhido + 1; i < 5; i++) {
				if(valores_circulos[i] > 0) {
					processo_escolhido = i;
					escolhido = true;
					break;
				}
			}

			// se não conseguiu escolher é porque o processo está para trás
			if(escolhido == false) {
				for(var i = 0; i < processo_escolhido; i++) {
					if(valores_circulos[i] > 0) {
						processo_escolhido = i;
						break;
					}
				}
			}
		}

		// atribui o processo escolhido ao processo corrente
		processo_corrente = processo_escolhido;

		// seta o texto da div
		div_cpu.innerHTML = "<h2>Processo " + (processo_corrente + 1) + " usando a CPU...</h2>";

		// verifica se o processo corrente é diferente do processo anterior
		if(ant_processo_corrente != processo_corrente) {
			trocas_contexto++;
			// configura o texto da div_contexto
			var texto_contexto = "<h2>Trocas de contexto: " + trocas_contexto + "</h2>";
			// seta o texto configurado na div_contexto
			document.getElementById("div_contexto").innerHTML=texto_contexto;
			// atualiza o processo anterior
			ant_processo_corrente = processo_corrente;
		}

		// compara os tempos para decidir o tempo de agendamento
		if(valores_circulos[processo_corrente] >= quantum) {
			timer = setInterval(executar, quantum * 1000);
		} else {
			timer = setInterval(executar, valores_circulos[processo_corrente] * 1000);
		}
	}

	// limpa todo o canvas
	circulos[0].clearRect(0, 0, 800, 600);

	// atualiza o canvas
	atualizarCanvas(processo_corrente);

	// atualiza a fila formando o texto da div_fila
	var texto_fila;
	if(fila.length > 0) {
		var texto_fila = "<h1>Fila: ";
		for(var i = 0; i < fila.length; i++) {
			texto_fila += "P" + (fila[i] + 1).toString() + " ";
		}
		texto_fila += "</h1>";
	} else {
		div_cpu.innerHTML = "<h2>Nenhum processo usando a CPU</h2>";
		texto_fila = "<h1>Todos os processos foram finalizados.</h2>";
	}

	// seta o texto da div_fila
	div_fila.innerHTML = texto_fila;

	// atualiza o novo valor do processo
	valores_circulos[processo_corrente] -= quantum;
	if(valores_circulos[processo_corrente] < 0)
		valores_circulos[processo_corrente] = 0;

	// remove o elemento da fila
	var indice_elem = fila.indexOf(processo_corrente);
	// verifica se o elemento existe na fila
	if(indice_elem != -1) {
		fila.splice(indice_elem, 1);
	}

	// se for maior do que 0, então insere na fila
	if(valores_circulos[processo_corrente] > 0)
		fila.push(processo_corrente);

	// incrementa o processo corrente
	processo_corrente++;

	// verifica se o processo_corrente passou de 5
	if(processo_corrente > 4)
		processo_corrente = 0;
}

// função que verifica se todos os processos estão finalizados
function processosFinalizados() {
	if(valores_circulos[0] == 0 && valores_circulos[1] == 0 && valores_circulos[2] == 0 
			&& valores_circulos[3] == 0 && valores_circulos[4] == 0) {
		return true;
	}
	return false;
}