$(document).ready(function () {

    $('#text_question').keyup(event => {
        if (event.target.value != '') {
            document.getElementById('text_question_label').innerText = event.target.value
        } else {
            document.getElementById('text_question_label').innerText = 'Question text'
        }
    })

    $('#test_answer1').keyup(event => {
        if (event.target.value != '') {
            document.getElementById('test_answer1_label').innerText = event.target.value
        } else {
            document.getElementById('test_answer1_label').innerText = 'Answer'
        }
    })

    $('#test_answer2').keyup(event => {
        if (event.target.value != '') {
            document.getElementById('test_answer2_label').innerText = event.target.value
        } else {
            document.getElementById('test_answer2_label').innerText = 'Answer'
        }
    })

    $('#test_answer3').keyup(event => {
        if (event.target.value != '') {
            document.getElementById('test_answer3_label').innerText = event.target.value
        } else {
            document.getElementById('test_answer3_label').innerText = 'Answer'
        }
    })

    $('#test_answer4').keyup(event => {
        if (event.target.value != '') {
            document.getElementById('test_answer4_label').innerText = event.target.value
        } else {
            document.getElementById('test_answer4_label').innerText = 'Answer'
        }
    })

    document.getElementById('btn-submit').addEventListener('click', event => {

        const data = new FormData(document.getElementById('full-test'));

        let ttt = {
            text_question: {
                question_text: data.get('text_question'),
            },
            test_answer1: {
                answer_text: data.get('test_answer1'),
                accuracy: false || data.get('accuracy') == 1
            },
            test_answer2: {
                answer_text: data.get('test_answer2'),
                accuracy: false || data.get('accuracy') == 2
            },
            test_answer3: {
                answer_text: data.get('test_answer3'),
                accuracy: false || data.get('accuracy') == 3
            },
            test_answer4: {
                answer_text: data.get('test_answer4'),
                accuracy: false || data.get('accuracy') == 4
            },
            group_id: 1,
        }

        console.log(ttt)
        const options = {
            url: '/fulltest',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: ttt
        }

        axios(options)
            .then(response => {
                const test = response.data
                console.log(test)
            })
            .catch(err => {
                console.log(err)
            })
    })
})