#app

### RFs (requisitos)

- [x] Deve ser possivel se cadastrar
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel obter o perfil de um usuario logado
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario
- [ ] Deve ser possivel o usuario obter seu historico de check-ins
- [ ] Deve ser possivel o usuario buscar academias proximas
- [ ] Deve ser possivel o usuario buscar academias pelo nome
- [x] Deve ser possivel o usuario realizar check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuario
- [ ] Deve ser possivel cadastrar uma academia

### RNs (regras de negocio)

- [x] O usario não deve poder se cadastrar com um email duplicado
- [x] O usario não pode fazer 2 check-ins no mesmo dia
- [x] O usario não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in não pode ser validado até 20 minutos apos criado
- [ ] O check-in so pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (requisitos não-funcionais)

- [x] A senha do usuario precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina
- [ ] O usuario deve ser identificado por um JWT