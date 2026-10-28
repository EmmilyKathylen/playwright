import {test} from '@playwright/test'

test.beforeEach(async({}, testInfo) => {
    if(testInfo.title === 'Criar usuários com dados válidos'){
        console.log('CRIANDO USUÁRIO\n')
    };
});

test.afterEach(async({}, testInfo) => {
    if(testInfo.title === 'Criar usuários com dados válidos') {
    console.log('EXCLUINDO CADASTRO')
    };
});

test('Criar usuários com dados válidos', async() => {
    const name: string = 'Emmily';
    const email: string = 'emmily@gmail.com';
    const password: string = 'eme123';

    console.log('Cadastro de usuário com dados válidos');
    console.log(`Nome: ${name}, E-mail: ${email}, Senha: ${password}\n`);
});

test('Cadastro com usuário vazio', async() => {
    const name: string = '';
    const email: string = 'emmily@gmail.com';
    const password: string = 'eme123';

    console.log('Cadastro com usuário vazio');
    console.log(`Nome: ${name}, E-mail: ${email}, Senha: ${password}\n`);
});

