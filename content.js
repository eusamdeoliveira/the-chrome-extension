let color = "#ff0000"

if(document.readyState !== 'complete') { // Verifica se o DOM já está preparado para ser manipulado
  addEventListener('load', () => { // espera ficar pronto
    startChromeListener() 
  })
} else { // já está pronto
  startChromeListener() 
}

function startChromeListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender) {
      if( request.active === true ) {
        startCreateListeners()
      } else {
        startRemoveListeners()
      }
      if (request.color) {
        color = request.color
        startRemoveListeners()
        startCreateListeners()  
      }
    }
  );
}

const startCreateListeners = () => { // foi necessário criar uma função para não colocar esse evento na tag body (apagaria tudo de uma vez)
  createListeners(document.querySelector('body'))
}

const startRemoveListeners = () => { // foi necessário criar uma função para não colocar esse evento na tag body (apagaria tudo de uma vez)
  const body = document.querySelector('body')
  removeListeners(body)
  removeChildBorder(body) 
}

const walkToChild = (element, callback) => {
  for (let e of element.children) { // chama os filhos dos elementos
    callback(e)
  }
}

function removeElementBorder(element) {
  if(element.style && element.style.border) {
    element.style.border = 'none'
  }
}

function removeChildBorder(element) {
  if(!element) return
  removeElementBorder(element)
  walkToChild(element, removeChildBorder)
}

function removeParentBorder(element) {
  if(!element) return
  removeElementBorder(element)
  removeParentBorder(element.parentNode)
}

function mouseenter(e) {
  const element = e.target

  removeParentBorder(element)
  element.style.border = '5px solid ' + color
  e.preventDefault() // evita que o botão execute seu comportamento (ex: ir para outra tela)
  e.stopPropagation() // evita que o pai também seja afetado
}

function mouseleave(e) {
  const element = e.target

  element.style.border = 'none'
}

function click(e) {
  const element = e.target

  element.remove()
  e.preventDefault()
  e.stopPropagation()
}

const createListeners = (element) => { // manipula cada elemento e chama seus filhos
  element.addEventListener('mouseenter', mouseenter)
  element.addEventListener('mouseleave', mouseleave)
  element.addEventListener('click', click)

  walkToChild(element, createListeners)
}

const removeListeners = (element) => {
  element.removeEventListener('mouseenter', mouseenter)
  element.removeEventListener('mouseleave', mouseleave)
  element.removeEventListener('click', click)

  walkToChild(element, removeListeners)
}
