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
                console.log(groups)
            })
            .catch(err => {
                console.log(err)
            })
    })()
})