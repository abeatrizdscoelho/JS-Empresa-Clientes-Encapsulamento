class Cliente {
    #cpf
    constructor(nome, cpf, endereco) {
        this.nome = nome
        this.endereco = endereco
        this.telefones = new Set()
        this.#cpf = cpf
        Object.defineProperty(this, 'informacoes', {
            get: function() { 
                let telefonesInfo = [...this.telefones].map(telefone => telefone.informacoes).join('\n');
                return '------------------\nNome: ' + this.nome + this.endereco.informacoes + '\nTelefones: \n' + telefonesInfo;
            }
        })
    }
    get pegarCPF(){
        return this.#cpf
    }
}

class Telefone {
    constructor(ddd, numero) {
        this.ddd = ddd
        this.numero = numero
        Object.defineProperty(this, 'informacoes', {
            get: function() { return 'DDD: ' + this.ddd + ' Número: ' + this.numero; }
        })
    }
}

class Endereco {
    constructor(estado, cidade, rua, numero){
        this.estado = estado.toUpperCase()
        this.cidade = cidade.toLowerCase()
        this.rua = rua
        this.numero = numero
        Object.defineProperty(this, 'informacoes', {
            get: function(){
                return '\nEstado: ' + this.estado + '  Cidade: ' + this.cidade + '  Rua: ' + this.rua + '  Número: ' + this.numero;
            }
        })
    }
}

class Empresa {
    #cnpj
    constructor(razaoSocial, nomeFantasia, cnpj, endereco){
        this.nomeFantasia = nomeFantasia;
        this.razaoSocial = razaoSocial;
        this.#cnpj = cnpj;
        this.endereco = endereco;
        this.clientes = new Set();
        this.telefones = new Set();
    }
    get pegarCnpj(){
        return this.#cnpj
    }
    adicionarCliente(cliente) {
        this.clientes.add(cliente);
    }
    adicionarTelefone(telefone) {
        this.telefones.add(telefone);
    }
    detalhe() {
        let clientesInfo = [...this.clientes].map(cliente => cliente.informacoes);
        return `Empresa: ${this.nomeFantasia} \nRazão Social: ${this.razaoSocial} \n${clientesInfo.join('\n')}`
    }
}

let empresa = new Empresa('ABC LTDA', 'Mercado Online', '22.222.222/2221-22', new Endereco('SP', 'São Paulo', 'Av. Paulista', '1000'));
empresa.adicionarTelefone(new Telefone('12', '9999-9999'));
empresa.adicionarTelefone(new Telefone('12', '9999-8888'));

let clientes = [
    new Cliente('Elisa Carvalho', '123.456.789-00', new Endereco('SP', 'São Paulo', 'Rua A', '123')),
    new Cliente('Ana Coelho', '231.564.879-01', new Endereco('RJ', 'Rio de Janeiro', 'Rua B', '456')),
    new Cliente('Esdras Guimarães', '321.654.987-02', new Endereco('MG', 'Belo Horizonte', 'Rua C', '789')),
    new Cliente('André Waldow', '132.354.889-03', new Endereco('PR', 'Curitiba', 'Rua D', '111')),
    new Cliente('Samuel Cunha', '332.556.779-04', new Endereco('MG', 'São Lourenço', 'Rua E', '222'))
];

clientes[0].telefones.add(new Telefone('11', '9999-1111'));
clientes[0].telefones.add(new Telefone('11', '9999-2222'));

clientes[1].telefones.add(new Telefone('11', '9999-3333'));
clientes[1].telefones.add(new Telefone('11', '9999-4444'));

clientes[2].telefones.add(new Telefone('11', '9999-5555'));
clientes[2].telefones.add(new Telefone('11', '9999-6666'));

clientes[3].telefones.add(new Telefone('11', '9999-7777'));
clientes[3].telefones.add(new Telefone('11', '9999-8001'));

clientes[4].telefones.add(new Telefone('11', '9999-8002'));
clientes[4].telefones.add(new Telefone('11', '9999-8003'));

clientes.forEach(cliente => empresa.adicionarCliente(cliente));
console.log(empresa.detalhe());