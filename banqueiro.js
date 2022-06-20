let processos = new Array();

let recursosExistentes = [4, 2, 3, 1]
let recursosDisponiveis = [2, 1, 0, 0]

processos.push({
    identificador: 1,
    alocado: [0, 0, 1, 0],
    requisicao: [2, 0, 0, 1]
})

processos.push({
    identificador: 2,
    alocado: [2, 0, 0, 1],
    requisicao: [1, 0, 1, 0]
})

processos.push({
    identificador: 3,
    alocado: [0, 1, 2, 0],
    requisicao: [2, 1, 0, 0]
})

let numeroProcessos = processos.length

for(var limite = 0; processos.length != 0; limite++){
    for (let i = 0; i < processos.length; i++) {
        let processo = processos[i];
        let flag = 0;
        for (let j = 0; j < processo.requisicao.length; j++) {
            let recursoAlocado = processo.alocado[j];
            let recursoReq = processo.requisicao[j];
            let recursoDisp = recursosDisponiveis[j];
            
            if((recursoAlocado + recursoDisp) >= recursoReq){
                flag++; continue;
            }else{
                break;
            }
        }
        if(flag == processos[i].requisicao.length){
            console.log("processo " + processo.identificador + " rodou");
            for(let k = 0; k < recursosDisponiveis.length; k++){
                recursosDisponiveis[k] += processo.alocado[k];
                processo.alocado[k] = 0;
            }  
            console.log(recursosDisponiveis,"\n");
    
            processos.splice(processos.findIndex(p => p.identificador == processo.identificador),1);
            i--;
        }
    }
    if(limite > numeroProcessos ** recursosExistentes.length){
        console.log("Deadlock");
        break;
    }
}
