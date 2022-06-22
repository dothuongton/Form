const $ = document.getElementById.bind(document);
const api = 'https://624fab5857d3be703e64f07a.mockapi.io/api/students';
$('btn--update').style.visibility = 'hidden';
let idUpdate;
function getData(){
    fetch(api)
    .then(res=>res.json())
    .then(data=>view(data));

    function view(data){
        let viewData = '';
        for(let i = 0 ; i<data.length;i++ ){
            const id = data[i].id;
            viewData +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].msv}</td>
                    <td>${data[i].fullName}</td>
                    <td>${data[i].lopHoc}</td>
                    <td>
                        <button class="form__register--btn btn--reset" onclick="edit('${id}')">Edit</button>
                    </td>
                    <td>
                        <button class="form__register--btn btn--delete" onclick = "deleteUser(${id})">Delete</button>  
                    </td>
                </tr>
            `;
        }
        $('table__view').innerHTML = viewData;
    }
}
getData();

function deleteUser (id){
    let result = confirm('xoá ko bạn ơi?');
        if(result){
            try {
                fetch(`${api}/${id}`, {
                    method: 'DELETE'
                })
                alert('Xoá thành công ');   
                getData();  
            } catch (e) {
                console.log(e)
            }
        }
        return false;
    
}
function save(){
    let msv = $('msv').value;
    let fullName = $('fullName').value;
    let lopHoc = $('lopHoc').value;
    if(msv !== '' && fullName !== '' && lopHoc!== ''){
        try {
            const requestSave = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    msv,fullName,lopHoc
                })
            };
            fetch(`${api}`,requestSave)
                .then(res => res.json())
            alert('Thêm thành công');
            getData();
        } catch (e) {
            console.log(e)
        }
    }
    else alert('Hãy điền đầy đủ thông tin !!!');
}


function reset(){
    $('msv').value = '';
    $('fullName').value = '';
    $('lopHoc').value = '';

}
function getValueEdit(id){
    fetch(`${api}/${id}`)
        .then(res=>res.json())
        .then(data=>{
                $('msv').value = data.msv;
                $('fullName').value = data.fullName;
                $('lopHoc').value = data.lopHoc;
            }
        );
}

function edit(id){
    getValueEdit(id);
    $('btn--save').style.visibility = 'hidden';
    $('btn--update').style.visibility = 'visible';
    idUpdate = id
}   


function update(e){
    e.preventDefault()
    let msv = $('msv').value;
    let fullName = $('fullName').value;
    let lopHoc = $('lopHoc').value;
    try {
        const requestUpdate = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               msv,fullName,lopHoc
            })
        };
        fetch(`${api}/${idUpdate}`, requestUpdate)
            .then(res => getData(reset()))
        
    } catch (e) {
        console.log(e)
    }
}
