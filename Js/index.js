var siteNameInput=document.getElementById('siteName');
var siteUrlInput=document.getElementById('siteUrl');
var visteUrlBtn=document.getElementById('visteUrl');


console.log()
var urlArray=[];

function checklocalStorage(){
    if(localStorage.getItem('Sites')!=null ){
        urlArray=JSON.parse(localStorage.getItem('Sites'));
        display(urlArray);
    }
}

checklocalStorage();

function addUrl(){

    if(validation(regexUrl , siteUrlInput.value)==true && validation(regexName , siteNameInput.value )==true){
        var site={
            name:siteNameInput.value,
            url:siteUrlInput.value
        }
    
        urlArray.push(site);
        localStorage.setItem("Sites",JSON.stringify(urlArray));
        console.log(urlArray);
        display(urlArray);
        clearForm();
    }
    else{
        swal({
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: `1) Site name must contain at least 3 characters

                   2)Site URL must be a valid one`,
            button: "OK!",
          });
    }

    


}

function display(arr){
    var trs="";
    for(var i=0 ;i<arr.length;i++){
        var urlLink="https://"+arr[i].url;
        trs+=`               
    <tr>
        <td>${i}</td>
        <td>${arr[i].name}</td>
        <td><button class="btn btn-success" onclick=" window.open('${urlLink}')" hr id="visteUrl" ><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
        <td><button class="btn btn-danger" onclick="deleteUrl(${i})"><i class="fa-solid fa-trash pe-2" ></i> Delete</button></td>

    </tr>`
    }
    document.getElementById('tableBody').innerHTML=trs;
}

function clearForm(){
    siteNameInput.value="";
    siteUrlInput.value="";
}

function deleteUrl(index){
    urlArray.splice(index,1);
    display(urlArray);
    console.localStorage(urlArray);

}


var regexUrl=/^www\.\w{3,}(\.com){1,1}$/;
var regexName=/^[A-Z]\w{2,}/;

function validation(regex , input){
    return regex.test(input);
}



