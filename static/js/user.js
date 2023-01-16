$(document).ready(function () {
    (() => {
        const options = {
            url: '/user/userlist',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
        }

        axios(options)
            .then(response => {
                const users = response.data
                users.forEach(element => {
                    $("#userlist").append(`<div class="item"><div class="header">${element.name}</div><span>${element.user_name}</span></div>`)
                });
                console.log(users)
            })
            .catch(err => {
                console.log(err)
            })
    })()
})