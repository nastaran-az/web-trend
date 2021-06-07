window.onload=ready;
function ready(){
    
    var empName=document.getElementById("name");
    var empBio=document.getElementById("bio");
    var next=document.getElementById("btn-next");
    var empRole1=document.getElementById("btn-role");
    var empRole2=document.getElementById("btn-role2");
    var showCrown=document.getElementById("crown");
    var empPic=document.getElementById("pic");
   //***************************************************************************************** *//
   // Function: to get data from API
    async function getEmployee() {
        let urlAll = 'http://sandbox.bittsdevelopment.com/code1/fetchemployees.php';
        try {
              let res = await fetch(urlAll);
              //console.log(res.json);
              let data=await res.json();
              console.log(data);
              return data
            } 
            catch (error) {
            console.log(error);
           }
    }
  //******************************************************************************************* *//
    //First employee load with page load to display in first page
    async function firstEmployee() {
            let employees = await getEmployee();// get employee function to get data from json file
            let text="";
            text +=employees[1].employeefname+" " + employees[1].employeelname;
            empName.innerHTML=text;
            empBio.innerHTML=employees[1].employeebio;
            empRole1.value=employees[1].roles[0].rolename;
            empRole1.style.backgroundColor=employees[1].roles[0].rolecolor;

             //length of role array
             let roleLen=employees[x].roles.length;
             if  (roleLen==2) 
             {
                 empRole2.style.display="inline-block";
                 empRole2.value=employees[1].roles[1].rolename;
                 empRole2.style.backgroundColor=employees[1].roles[1].rolecolor;
             }

             // to display crown for featured employees
             if (employees[1].employeeisfeatured=="1"){
               showCrown.style.visibility="visible";
             }
             getPics(1);
     }// end of firstEmployee function
   //********************************************************************************************* *// 

    //calling firsEmployee function
    firstEmployee();
    let x=1;// global variable to count employees

    //with click on next, displayAlleployee function will execute. The function display employees 
    next.onclick=displayAllEmployee;

  //*********************************************************************************************** *//
    //Function: to display all employees 
    async function displayAllEmployee() {
             //to make sure the second button and crown will appeare in correct condition
             empRole2.style.display="none";
             showCrown.style.visibility="hidden";

             //to keep employee id or index
             ++x;
             let text;
            // console.log(x);
            //getting data fron getEmployee and copy in employees variable
            let employees = await getEmployee();

            //getting object length or employees number
            let len=Object.keys(employees).length;
            
           
          // if there is an  employee
          if (x<=len)
         {
            text="";
            text +=employees[x].employeefname+" " + employees[x].employeelname;
            empName.innerHTML=text;
            empRole1.value=employees[x].roles[0].rolename;
            empRole1.style.backgroundColor=employees[x].roles[0].rolecolor;
            empBio.innerHTML=employees[x].employeebio;  
            //length of role array
            let roleLen=employees[x].roles.length;

            //if there is another role second button will be displayed
            if  (roleLen==2) 
            {
                empRole2.style.display="inline-block";
                empRole2.value=employees[x].roles[1].rolename;
                empRole2.style.backgroundColor=employees[x].roles[1].rolecolor;
            }
            // to display crown for featured employees
            if (employees[x].employeeisfeatured=="1")
            {
                   showCrown.style.visibility="visible";
             }
            getPics(x); 
          }
         else 
         {
             empName.innerHTML="END";
             empBio.innerHTML="";
             next.disabled=true;
             next.style.backgroundColor="lightgray";
             empRole2.style.visibility="hidden";
             empRole1.style.visibility="hidden";
             empPic.src="default.jpg";
         }
    }// end of displayAllemployee function

    //**************************************************************************************//

    //Function: get pictures
    async function getPics(id) {
     
      let urlPic = 'http://sandbox.bittsdevelopment.com/code1/employeepics/';
      let image=urlPic+id+".jpg"  
      if (image)
      {
        empPic.src=image;
      }
      else{
        empPic.src="default.jpg"
      }
    }//end of getPics function

}