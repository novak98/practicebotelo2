const app = document.getElementById('root')



const deleteItem = (id) => {
  
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {     method: "DELETE", })
  .then(response => {
    
    if (response.status === 200 ) {
      data = data.filter(dataItem => id != dataItem.id);
      renderTable(data)
    
    }
  })
  } 
  const updateValue = (e) => {
    if(data[0].isEnabled){
      data[0][e.target.id] = e.target.value;
      console.log(e.target.id, data[0][e.target.id])
    
    }
  }


const container = document.getElementById('table')

const renderCells = (items) => {
  return items.map(item => {
   const customCell = document.createElement("div")
   customCell.setAttribute('class', 'col-lg-2')
   const customCellP = document.createElement('p')
    if (item.key !== "username") customCellP.setAttribute('class','numbers')
   customCellP.textContent = item.value
     customCell.appendChild(customCellP)
     return customCell;
  })
}
let data;
var request = new XMLHttpRequest()
request.open('GET', 'https://jsonplaceholder.typicode.com/users', true)
request.onload = function () {
   data = JSON.parse(this.response)
   data.forEach((item,index) => {
    data[index].isEnabled = false;
   })
  if (request.status >= 200 && request.status < 400) {
   renderTable(data)
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}
 const renderTable = (data) => {
    data.forEach((item,index) => {
      const row = document.createElement('div')
     row.setAttribute('class', 'row mainrow')
      row.onclick = () => renderSideBar(item)

     const items = [
       {
         key:"name",
         value:item.name
       }, {
         key:"username",
         value:item.username

       },
       {
         key:"email",
         value:item.email
       },
       {
         key:"street",
         value:item.address.street
       },
     ]
   
      


        const button1 = document.createElement('div')
        button1.setAttribute('class', 'col-lg-2')
        const button1C = document.createElement('button')
        button1C.onclick = (event) => {
         data[index].isEnabled = !data[index].isEnabled
        }
        button1C.setAttribute('class','btn1')
        button1C.innerHTML = "edit";
        button1.appendChild(button1C)

        const button2 = document.createElement('div')
        button2.setAttribute('class', 'col-lg-2')
        const button2C = document.createElement('button')
        const handle1 = (event) => {
          event.stopPropagation()
        container.innerHTML=""
        const test = deleteItem(item.id)
      
      
        }
        button2C.onclick = (event) => handle1(event)
        button2C.setAttribute('class','btn2')
        button2C.innerHTML = "delete";
        button2.appendChild(button2C)

        
        const cells = renderCells(items);
       cells.forEach(cell => row.appendChild(cell))
       

    row.appendChild(button1)
    row.appendChild(button2)


     container.appendChild(row)

    })
  } 
 
request.send()


const renderSideBar = (item) => {
  const sideBar = document.getElementsByClassName("rightsection")[0];

//  const keys = Object.keys(item)
 
// keys.forEach((key) => {
//   const input = document.querySelector(`#${key}`)
//   console.log(input)
//   input.value=item[key]
//   input.disabled = !item.isEnabled
//   input.addEventListener('submit',updateValue)
    
// })
       
  const name = document.querySelector("#name")
  name.value=item.name
  name.disabled = !item.isEnabled
  name.addEventListener('submit',updateValue)
  const username = document.querySelector("#username")
  username.value=item.username
  username.disabled = !item.isEnabled
  username.addEventListener('submit',updateValue)
  const email = document.querySelector("#email")
  email.value=item.email
  email.disabled = !item.isEnabled
  email.addEventListener('submit',updateValue)
  const street = document.querySelector("#street")
  street.value=item.address.street
  street.disabled = !item.isEnabled
  street.addEventListener('submit',updateValue)
  const phone = document.querySelector("#phone")
  phone.value=item.phone
  phone.disabled = !item.isEnabled
  phone.addEventListener('submit',updateValue)
  const bs = document.querySelector("#bs")
  bs.value=item.company.bs
  bs.disabled = !item.isEnabled
  const website = document.querySelector("#website")
  website.value=item.website
  website.disabled = !item.isEnabled
  const zipcode = document.querySelector("#zipcode")
  zipcode.value=item.address.zipcode
  zipcode.disabled = !item.isEnabled
  const suite = document.querySelector("#suite")
  suite.value=item.address.suite
  suite.disabled = !item.isEnabled
} 