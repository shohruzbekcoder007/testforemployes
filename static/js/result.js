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
                    if(document.querySelector("#group-select")){
                        $("#group-select").append(`<option value=${element._id}>${element.group_name}</option>`)
                    }
                });
                get_users(document.querySelector("#group-select").value)
            })
            .catch(err => {
                console.log(err)
            })
    })()

    const get_users = (group) => {
        const options = {
            url: `/user/userlistbygroup?group=${group}`,
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
                $("#user-list").html('')
                users.forEach(element => {
                    $("#user-list").append(`<div class="item"><div class="header">${element.name}</div><span>${element.user_name}</span></div>`)
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    document.querySelector("#group-select").addEventListener('change', (event) => {
        get_users(event.target.value)
    })

})