const spaceships = []

function findSpaceship(name: string) {
  return spaceships.find((ship) => ship.name === name)
}

function newSpaceship(spaceshipName: string, namePilot: string, crewLimit: number) {
  const spaceship = {
    name: spaceshipName,
    pilot: namePilot,
    crewLimit: crewLimit,
    crew: [],
    inMission: false
  }
  spaceships.push(spaceship)
  alert(`Nave ${spaceship.name} foi registrada`) 
}

function menuNewSpaceship() {
  const spaceshipName = prompt("Insira o nome da espaconave")
  const spaceshipPilot = prompt("Insira o nome do piloto")
  const spaceshipCrewLimit = Number(prompt("Insira o numero maximo de tripulantes da espaconave"))
  newSpaceship(spaceshipName, spaceshipPilot, spaceshipCrewLimit)
}

function addCrewToSpaceshipExist(member: string, spaceship: { name :string, crewLimit: number, crew: string[] }) {
  if(spaceship.crew.length > spaceship.crewLimit) {
    alert(`Limite da nave atingido, ${member} nao pode ser adicionado`) 
  } else {
    spaceship.crew.push(member)
    alert(`${member} adicionado com sucesso a tripulacao`)
  }
}

function menuAddCrew() {
  const spaceshipTarget = prompt("Insira o nome da nave que deseja adicionar um novo tripulates")
  const spaceship = findSpaceship(spaceshipTarget)
  if(spaceship) {
    const member = prompt("Insira o nome do tripulante que deseja adicionar")
    addCrewToSpaceshipExist(member, spaceship)
  } else {
    alert(`Espaconave ${spaceshipTarget} nao foi achado nos registros`)
  }
}

function sendSpaceshipToMission(crewMinimum: number, spaceship: { name: string, inMission: boolean, crew: string[] }) {
  const crewTotal = spaceship.crew.length
  if(spaceship.inMission) {
    alert(`Espaconave ${spaceship.name} ja esta em missao`)
  } else if(crewTotal >= crewMinimum && !spaceship.inMission) {
    spaceship.inMission = true
    alert(`Espaconave ${spaceship.name} enviada em missao`)
  } else {
    alert(`tripulacao da nave ${spaceship.name} esta abaixo do permitido para o lancamento`)
  }
}

function menuSendSpaceship() {
  const spaceshipTarget = prompt("Insira o nome da nave que deseja mandar em missao")
  const spaceship = findSpaceship(spaceshipTarget)
  if(spaceship) {
    const crewMinimum = Math.floor(spaceship.crewLimit / 3)
    sendSpaceshipToMission(crewMinimum, spaceship)
  } else {
    alert(`Espaconave ${spaceshipTarget} nao foi achado nos registros`)
  }
}

function showAllSpaceships() {
  let list = "Naves Registradas:\n"

  spaceships.forEach((spaceship) => {
    list += `
      Nave: ${spaceship.name},
      Piloto: ${spaceship.pilot},
      Tamanho Maximo da tripulacao: ${spaceship.crewLimit},
      Em missao?: ${spaceship.inMission ? "Sim" : "Nao"},
      Tripulantes: ${spaceship.crew.length}
    `

    spaceship.crew.forEach(member => {
      list += `     - ${member}\n`
    })
  })
  alert(list)
}

let condition = true
do {
  const choice = prompt("1 - Adicionar nova espaconave \n2 - Adicionar um membro a uma espaconave existente \n3 - Enviar uma espaconave em missao \n4 - Lista todas as aeronaves em missao \n5 - Sair")
  switch(choice) {
    case "1":
      menuNewSpaceship()
    break
    case "2":
      menuAddCrew()
    break
    case "3":
      menuSendSpaceship()
    break
    case "4":
      showAllSpaceships()
    break
    case "5":
      condition = false
    break
    default:
      alert("Escolha invalida")
  }
} while(condition)
