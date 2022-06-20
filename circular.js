let prompt = require('prompt-sync')();

let processador = {
    fatiaTempo: Number(prompt('Fatia de tempo: ')),
    trocaContexto: Number(prompt('Troca de contexto: '))
};

let memoria = new Array();
let concluidos = new Array();

let flag = 1
let idSerial = 1
while(flag == 1){
    flag = Number(prompt('Criar um processo? (0/1): '));
    if(flag == 1){
        let tp = Number(prompt('Tempo de processamento: '));
        memoria.push({
            identificador: idSerial++,
            tempoTurnaround: 0,
            tempoProcessamento: tp,
            tempoEspera: 0
        });
    }else if(flag == 0){
        break;
    }else{
        flag = 1;
        console.log("Apenas 0(não) ou 1(sim)")
    }
}

memoria = memoria.sort((p1, p2) => p1.identificador - p2.identificador)

let unidadeTempo = 0 
while(memoria.length != 0){
    for(let j = 0; j < memoria.length; j++){
        let id = memoria[j].identificador
        for(let i = 0; i < processador.fatiaTempo; i++){
            unidadeTempo++;
            memoria[j].tempoProcessamento--;
            memoria[j].tempoEspera++;
            memoria[j].tempoTurnaround = unidadeTempo;

            if(memoria[j].tempoProcessamento == 0){
                memoria[j].tempoEspera = memoria[j].tempoTurnaround - memoria[j].tempoEspera;
                concluidos.push(memoria.splice(memoria.findIndex(p => {
                    return p.identificador == id;
                }), 1)[0]);
                j--;
                break;
            }
        }
        unidadeTempo += processador.trocaContexto;
    }
    if(memoria.length == 0){
        unidadeTempo -= processador.trocaContexto;
    }
}

console.log("\n-----------------------------------------------------\n")
concluidos.forEach(processo => {
    console.log("ID: " + processo.identificador + "\n" +
                "Turnaround: "+ processo.tempoTurnaround + "\n" +
                "Espera: " + processo.tempoEspera + "\n");
});

let tempoTurnaroundTotal = 0;
let tempoEsperaTotal = 0;
let numeroProcessos = concluidos.length;

concluidos.forEach(p => tempoTurnaroundTotal+=p.tempoTurnaround)
concluidos.forEach(p => tempoEsperaTotal+=p.tempoEspera)

let mediaTurnaround = (tempoTurnaroundTotal / numeroProcessos).toFixed(2);
let mediaEspera = (tempoEsperaTotal / numeroProcessos).toFixed(2);

console.log("Tempo médio de Turnaround: " + mediaTurnaround)
console.log("Tempo médio de espera: " + mediaEspera)
