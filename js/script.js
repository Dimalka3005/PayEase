// save employee data
document.getElementById('employeeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('empId').value;
    const name = document.getElementById('empName').value;
    const basicSalary = document.getElementById('basicSalary').value;
    const otRate = document.getElementById('otRate').value;

    const epf = basicSalary * 0.08;

    const employee = {
        id,
        name,
        basicSalary,
        otRate,
        epf
    };

    document.getElementById('saveAlert').hidden = false;
    // save employee data to local storage
    localStorage.setItem(id, JSON.stringify(employee));
    ShowAlert('saveAlert', 'success', 'Save Completed !', 'Employee ID: ' + id + ' save Successfully.')
    document.getElementById('employeeForm').reset();

});


// employee search
function searchEmployee() {

    const searchId = document.getElementById('searchEmpId').value;
    const empData = localStorage.getItem(searchId);
    if (empData) {
        const empObj = JSON.parse(empData);
        document.getElementById('SeResult').hidden = false;
        // display employee data
        document.getElementById('SeResult').innerHTML = `
            <h6><b>Employee ID</b> : ${empObj.id}</h6>
            <h6><b>Employee Name</b> : ${empObj.name}</h6>
            <h6><b>Basic Salary</b> : ${empObj.basicSalary}</h6>
            <h6><b>OT Rate</b> : ${empObj.otRate}</h6>
            <h6><b>EPF</b> : ${empObj.epf}</h6>
            `;

    } else {
        // alert('Not found this Employee');
        document.getElementById('WarAlert').hidden = false;
        ShowAlert('WarAlert', 'warning', 'Not Found!', 'this employee is not relate in this system.');
    }
};

// salary Calculation
function salCal() {
    document.getElementById('WarAlertforCal').hidden = false;
    const searchId = document.getElementById('searchEmpId').value;
    const empData = localStorage.getItem(searchId);
    const otH = parseFloat(document.getElementById('otHours').value);
    const ded = parseFloat(document.getElementById('deduction').value);
    if (empData) {
        if (!otH==""&&!ded=="") {
            const empObj = JSON.parse(empData);
            const BS = parseFloat(empObj.basicSalary);
            const OtR = parseFloat(empObj.otRate);
            const EPF = parseFloat(empObj.epf);

            //calculation
            const OA = OtR * otH;
            const neSalary = (BS + OA + EPF) - ded;

            //outResult
            document.getElementById('salResult').hidden = false;
            document.getElementById('salResult').innerHTML = `
            <h3><b>Salary </b>: LKR ${neSalary} </h3>`;
        }else{
            ShowAlert('WarAlertforCal','warning','Empty Fields !','You Must Enter OT_HOURS and DEDUCTION.')
        }

    } else {
        ShowAlert('WarAlertforCal', 'warning', 'Not Found!', 'this employee is not relate in this system.');
    }

}

//Display Total Employee Count
document.getElementById('totalEmp').innerHTML = localStorage.length;

//Display All Employee Data
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const empData = localStorage.getItem(key);
    const empObj = JSON.parse(empData);
    document.getElementById('empListBody').innerHTML += `
        <tr>
            <td>${empObj.id}</td>
            <td>${empObj.name}</td>
        </tr>
    `;
}

//hide Dashboard
function hidDash() {
    document.getElementById('Dashboard').hidden = true;
}

//hide EmpSeAndSalCal Part
function hidEmpSeAndSalCal(){
    document.getElementById('EmpSeAndSalCal').hidden = true;
}

//hide NeEmpSav Part
function HidNeEmpSav(){
    document.getElementById('NeEmpSav').hidden = true;
}

//show Dashboard
function showDashboard() {
    document.getElementById('Dashboard').hidden = false;
    document.getElementById('EmpSeAndSalCal').hidden = true;
    document.getElementById('NeEmpSav').hidden = true;
}

//show EmpSeAndSalCal Part
function showEmpSeAndSalCal(){
    hidDash();
    document.getElementById('NeEmpSav').hidden = true;
    document.getElementById('EmpSeAndSalCal').hidden = false;
}

//show NeEmpSav Part
function showNeEmpSav(){
    hidDash();
    document.getElementById('EmpSeAndSalCal').hidden = true;
    document.getElementById('NeEmpSav').hidden = false;
}


//Alert
function ShowAlert(id, alertType, title, msg) {
    document.getElementById(id).innerHTML = `
        <div class="alert alert-`+ alertType + ` alert-dismissible fade show" role="alert">
            <strong>`+ title + `</strong> ` + msg + `
        </div>`;
}

//HideDisplay
function hidSeDis() {
    document.getElementById('SeResult').hidden = true;
}
function hidSalCalDis() {
    document.getElementById('salResult').hidden = true;
}


// clearEmpFormDataMethod
function clearEmpFormData() {
    document.getElementById('employeeForm').reset();
    document.getElementById('saveAlert').hidden = true;
}

//clearSearchFormDataMethod
function clearSearchData() {
    document.getElementById('searchEmpId').value = "";
    document.getElementById('SeResult').innerHTML = "";
    document.getElementById('WarAlert').hidden = true;
    hidSeDis();
}

//clearSalFormDataMethod
function clearSalData() {
    document.getElementById('WarAlertforCal').hidden = true;
    document.getElementById('otHours').value = "";
    document.getElementById('deduction').value = "";
    hidSalCalDis();
}