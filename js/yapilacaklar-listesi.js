const addButton=document.getElementById("addButton")
const addInput=document.getElementById("addInput")
const taskList=document.getElementById("taskList")
let successDom=document.querySelector("#successToast")
let removeDom=document.querySelector("#removeToast")
let uptadateDom=document.querySelector("#updateToast")
let scBtn=document.querySelector("#sc-btn")
let rmBtn=document.querySelector("#rm-btn")
let upBtn=document.querySelector("#up-btn")

addButton.addEventListener("click",addTask)
scBtn.addEventListener('click',function(){closeToast(successDom)})
rmBtn.addEventListener('click',function(){closeToast(removeDom)})
upBtn.addEventListener('click',function(){closeToast(uptadateDom)})
//itemadresi.addEventListener(event,fonksiyon)

document.addEventListener("DOMContentLoaded", function() {
    loadLocalStorage()
});


//Task eklemeye yarayan fonksiyon
function addTask(){
    const taskText=addInput.value.trim()// Trim ile boş bırakıldığında listeye eklenmemesi sağlandı ve alert ile boş bırakıldı uyarısı tetiklenecek

    if(taskText){
        let li=document.createElement("li")//Ul içinde liste oluşturuldu
        li.innerHTML=taskText;//Input içine girilen text html sayfasındaki liste içine atandı
        taskList.prepend(li)// Girilen text ile liste oluşturuldu
        li.addEventListener('click',doneTask)
        
        let i=document.createElement("i")
        i.addEventListener('click',deleteTask)
        i.classList.add("fa-solid", "fa-xmark","close")

        li.appendChild(i)
        sToast(successDom)
        addInput.value=""// liste oluşturulduktan sonra input kısmı resetlendi
        saveLocalStorage()
    } else{
        sToast(removeDom)
    }
    addInput.value="" // Boş bıraktınız uyarısından sonra tekrardan resetleyecek
   


}

//Taskı silmeye yarayan fonksiyon
function deleteTask(event){

   event.target.parentElement.remove()


}

//Taskı done yapmaya yarayan fonksiyon
function doneTask(event){

    if(event.target.classList.contains('checked')){

        event.target.classList.remove('checked')

    }else{

    event.target.classList.add('checked')

    }
    sToast(uptadateDom)
    saveLocalStorage()
    
}

function saveLocalStorage(){

    localStorage.setItem("data",taskList.innerHTML );

}

function loadLocalStorage(){
    taskList.innerHTML = localStorage.getItem("data");
}

//Toastı göstermeye yarayan fonksiyon
function sToast(event)
{

    event.classList.remove("hide");
    event.classList.add("show");


    setTimeout(function() {
        event.classList.remove("show");
        event.classList.add("hide");
    }, 300000);

}

//Toastı gizlemeye yarayan fonksiyon (Kapatmaya)
function closeToast(event){
   
    event.classList.add("hide")
    event.classList.remove("show")
   
}

