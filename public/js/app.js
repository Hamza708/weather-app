const wform = document.querySelector('form')
const search = document.querySelector('input')

wform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {

    response.json().then((data) =>{

    if(data.error)
    {
       document.getElementById("1").innerHTML = data.error
       document.getElementById("2").innerHTML = " "
    }
    else
    {

        document.getElementById("1").innerHTML = data.location
        document.getElementById("2").innerHTML = data.weather
        document.getElementById("3").innerHTML = "" 
        document.getElementById("4").src = data.icon 
        document.getElementById("5").innerHTML = data.wdesc 
        document.getElementById("6").innerHTML =  data.wspeed 
        document.getElementById("7").innerHTML =  data.precip + '%'
        document.getElementById("8").innerHTML =  data.feelslike 
        document.getElementById("9").innerHTML =  data.humidity 
        
    }

    })


})
})


