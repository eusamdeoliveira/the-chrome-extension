if(document.readyState !== 'complete') { // Verifica se o DOM já está preparado para ser manipulado
  addEventListener('load', () => { // espera ficar pronto
    startCreateListeners() 
  })
} else { // já está pronto
  startCreateListeners() 
}

const startCreateListeners = () => { // foi necessário criar uma função para não colocar esse evento na tag body (apagaria tudo de uma vez)
  for (let e of document.querySelector('body').children) { // recursivamente seleciona cada elemento (e seus filhos)
    handleListeners(e) 
  }
}

function removeParentBorder(element) {
  if(!element || !element.style || !element.style.border) return
  element.style.border = 'none'
  return removeParentBorder(element.parentNode)
}

const handleListeners = (element) => { // manipula cada elemento e chama seus filhos
  element.onmouseenter = (e) => { //início do hover
    removeParentBorder(element)
    element.style.border = '5px solid #ff0000'
    e.preventDefault() // evita que o botão execute seu comportamento (ex: ir para outra tela)
    e.stopPropagation() // evita que o pai também seja afetado
  }
  element.onmouseleave = (e) => {
    element.style.border = 'none'
  }
  element.onclick = (e) => {
    element.remove()
    e.preventDefault()
    e.stopPropagation()
  }

  // remover a borda quando o mouse sair: onmouseleave

  // remover o elemento quando clicar: 

  for (let e of element.children) { // chama os filhos dos elementos
    handleListeners(e)
  }
}
