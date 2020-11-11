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
  const updateValue = (e,item,index) => {
    if(data[index].isEnabled){
      if(Object.keys(item.address).includes(e.target.id)) 
data[index]['address'][e.target.id]= e.target.value
else if (['bs'].includes(e.target.id))
data[index]['company'][e.target.id]= e.target.value
else data[index][e.target.id]=e.target.value
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
      row.onclick = () => renderSideBar(item,index)

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


const renderSideBar = (item,index) => {
  const sideBar = document.getElementsByClassName("rightsection")[0];

  let copy = JSON.parse(JSON.stringify(item))
  copy = {...copy,...item.address, bs:''}
  delete copy.city
  delete copy.geo
  delete copy.id
  delete copy.isEnabled
  delete copy.company
  delete copy.address
  const keys = Object.keys(copy)
  const adresses = ['street','zipcode','suite'];
  const company = 'bs';
  

keys.forEach((key) => {
  
  const input = document.querySelector(`#${key}`)
 
 
  if(adresses.includes(key)) input.value = item['address'][key];
   else if (key === company) input.value = item['company'][key]
    else  input.value = item[key]
  input.disabled = !item.isEnabled
  input.addEventListener('input',(e) => updateValue(e,item,index))
    
})
 } 