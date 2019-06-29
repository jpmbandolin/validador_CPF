let validaCPF = cpf=>{
	if (!Number.isInteger(cpf) && cpf.length > 11) { //remove mascara
		cpf = cpf.replace(/[.-]/g, "");
	}
	
	if(Number.isInteger(cpf)){ //Completa zeros a esquerda
		cpf = cpf.toString().padStart(11, '0');
	}
	
	if (cpf.length !== 11) {
		return false; // tamanho invalido
	}

	let arrCpf 		= cpf.split('');
	let indexArray 	= 0;

	while(arrCpf[indexArray] === arrCpf[indexArray + 1] && indexArray <= 10){ //Verifica se todos os caracteres são iguais
		indexArray++;
	}

	if(indexArray === 10){
		return false;
	}

	let multiplicador 		= 10;
	let resultado 			= 0;
	let multiplicador2Digito 	= 11;
	let resultado2Digito 		= 0;

	arrCpf.forEach((item, index)=>{ //calcula digito verificador esperado
		if(index < 9){
			resultado += parseInt(item) * multiplicador;
			multiplicador--;
		}
		if(index < 10){
			resultado2Digito += parseInt(item) * multiplicador2Digito;
			multiplicador2Digito--;
		}
	});

	let validaDigitoVerificador 		= (resultado 		* 10) % 11;
	let validaSegundoDigitoVerificador 	= (resultado2Digito 	* 10) % 11;
	
	validaDigitoVerificador 	= validaDigitoVerificador 		=== 10 ? 0 : validaDigitoVerificador;
	validaSegundoDigitoVerificador	= validaSegundoDigitoVerificador 	=== 10 ? 0 : validaSegundoDigitoVerificador;

	return !(validaDigitoVerificador !== parseInt(arrCpf[9]) || validaSegundoDigitoVerificador !== parseInt(arrCpf[10])); //valida digito verificador e retorna
	
};
