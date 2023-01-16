$(document).ready(function () {
    (() => {
        const options = {
            url: '/group/grouplist',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
        }

        axios(options)
            .then(response => {
                const groups = response.data
                groups.forEach(element => {
                    if(document.querySelector("#grouplist")){
                        $("#grouplist").append(`<div class="item"><div class="header">${element.group_name}</div><span>${element.group_name}</span></div>`)
                    }
                    $("#group").append(`<option value=${element._id}>${element.group_name}</option>`)
                });
                console.log(groups)
            })
            .catch(err => {
                console.log(err)
            })
    })()
})