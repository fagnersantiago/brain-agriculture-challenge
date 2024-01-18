# Projeto Cadastro de Produtor Rural

Este projeto consiste em um teste técnico que visa a criação de uma api de cadastro de produtor rural. O mesmo foi desenvolvido utilizando as seguintes tecnologias:

- Node.js
- TypeScript
- Express.js
- Prisma
- Docker
- Tsyringe
- Yarn
- Banco de Dados Postgresql

## Rotas

### Cadastrar Produtor Rural

- **Método:** POST
- **URL:** http://localhost:3333/ruralProducer/create
- **Corpo da Requisição:**
  ```json
  {
    "cpfCnpj": "string",
    "producerName": "string",
    "farmName": "string",
    "city": "string",
    "state": "string",
    "totalFarmArea": 0,
    "agriculturalArea": 0,
    "vegetationArea": 0,
    "plantedCrops": ["string"]
  }
  ```

### Excluir Produtor Rural

- **Método:** DELETE
- **URL:** http://localhost:3333/ruralProducer/delete/:id

### Editar Produtor Rural

- **Método:** PUT
- **URL:** http://localhost:3333/ruralProducer/update/:id

### Dashboard - Obter Dados

- **Método:** GET
- **URL:** http://localhost:3333/ruralProducer/dashboard

**Exemplo de Retorno:**
```json
{
  "totalFarmsInQuantity": 5,
  "totalFarmInHectare": 54300,
  "pieChartCulture": {
    "MILHO": 2,
    "CAFÉ": 2,
    "SOJA": 2,
    "ALGODÃO": 1,
    "CANA-DE-AÇUCAR": 1
  },
  "pieChartLandUse": {
    "agriculturalArea": 10100,
    "vegetationArea": 10100
  },
  "pieChartByState": [
    {
      "state": "Acre",
      "total": 0
    },
    {
      "state": "ALAGOAS",
      "total": 1
    },
    // ... (outros estados)
  ]
}
```

**Retornos de Erro:**
  - **Conflito (409):**
    ```json
    {
      "message": "Producer already exists",
      "statusCode": 409
    }
    ```
  - **Não Encontrado (404):**
    ```json
    {
      "message": "Producer Not Found",
      "statusCode": 404
    }
    ```
  - **Bad Request (400):**
    - CPF ou CNPJ inválido:
      ```json
      {
        "message": "Invalid CPF OR CNPJ",
        "statusCode": 400
      }
      ```
    - Soma da Área Agrícultáve e Vegetação maior que a Área Total da Fazenda:
      ```json
      {
        "message": "The sum Agricultural Area and vegetation cannot be greater than the total area of the farm",
        "statusCode": 400
      }
      ```
  - **Erro Interno do Servidor (500):**
    ```json
    {
      "message": "Internal Server Error",
      "statusCode": 500
    }
    ```

## Execução do Projeto

Para executar as migrações, execute o seguinte comando:

```bash
yarn prisma:migrate
```

Para popular as tabelas, execute o comando:

```bash
yarn seed
```

Para executar o projeto em ambiente de desenvolvimento, utilize o comando:

```bash
yarn dev
```

Certifique-se de ter todas as dependências instaladas antes de iniciar o projeto.


