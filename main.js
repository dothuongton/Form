const api = [
    'https://624fab5857d3be703e64f07a.mockapi.io/api/students'
]
fetch(api[0])
    .then(res=>res.json())
    .then(data=>hienthi(data));

function hienthi(data){
    let viewData = '';
    for(let i = 1 ; i<data.length;i++ ){
        viewData +=`
        <tr>
            <td>${i}</td>
            <td>${data[i].msv}</td>
            <td>${data[i].name}</td>
            <td>${data[i].class}</td>
            <td>
                <button class="form__register--btn btn--reset" onclick="edit()">Edit</button>
            </td>
            <td>
                <button class="form__register--btn btn--delete">Delete</button>  
            </td>
         </tr>
        `;
    }
    document.getElementById('table__view').innerHTML = viewData;
}

