const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')
const {
    validateFullTest,
    questionValidate,
    answerValidate,
} = require('../models/create_full_test.model');
const { Query } = require('../models/question.model');
const { Answer } = require('../models/answer.model');
const { Test, validate } = require('../models/app_test.model');
const { CorrectAnswer } = require('../models/correct_answer.model');

router.post('/', async (req, res) => {

    const { error } = validateFullTest(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    if(questionValidate(req.body.text_question || {}).error)
        return res.status(400).send(error.details[0].message);


    if(answerValidate(req.body.test_answer1 || {}).error)
        return res.status(400).send(error.details[0].message);

    
    if(answerValidate(req.body.test_answer2 || {}).error)
        return res.status(400).send(error.details[0].message);

    if(answerValidate(req.body.test_answer3 || {}).error)
        return res.status(400).send(error.details[0].message);

    if(answerValidate(req.body.test_answer4 || {}).error)
        return res.status(400).send(error.details[0].message);

    let haveTestAnswer = false || req.body.test_answer1.accuracy || req.body.test_answer2.accuracy
                                  req.body.test_answer3.accuracy || req.body.test_answer4.accuracy

    if(haveTestAnswer === false){
        return res.status(400).send("To'g'ri javobni kiriting")
    }

    let numberRightAnswer = 0;
    let reightAnswer = 0;

    if (req.body.test_answer1.accuracy) {
        numberRightAnswer++
        reightAnswer = 1
    }
    if (req.body.test_answer2.accuracy) {
        numberRightAnswer++
        reightAnswer = 2
    }
    if (req.body.test_answer3.accuracy) {
        numberRightAnswer++
        reightAnswer = 3
    }
    if (req.body.test_answer4.accuracy) {
        numberRightAnswer++
        reightAnswer = 4
    }

    if (numberRightAnswer != 1 && reightAnswer == 0) {
        return res.status(400).send("To'g'ri javoblar sonini to'g'ri kiriting")
    }

    try{
        let query = new Query({question_text: req.body.text_question.question_text});
        let newquestion = await query.save();

        let answer1 = new Answer({answer_text: req.body.test_answer1.answer_text});
        let newanswer1 = await answer1.save();

        let answer2 = new Answer({answer_text: req.body.test_answer2.answer_text});
        let newanswer2 = await answer2.save();

        let answer3 = new Answer({answer_text: req.body.test_answer3.answer_text});
        let newanswer3 = await answer3.save();

        let answer4 = new Answer({answer_text: req.body.test_answer4.answer_text});
        let newanswer4 = await answer4.save();

        // console.log({ text_question: newquestion._id, test_answer1: newanswer1._id, test_answer2: newanswer2._id, test_answer3: newanswer3._id, test_answer4: newanswer4._id, group_id: req.body.group_id})
        // const errorfull = validate({ text_question: newquestion._id, test_answer1: newanswer1._id, test_answer2: newanswer2._id, test_answer3: newanswer3._id, test_answer4: newanswer4._id, group_id: req.body.group_id})
        // if(errorfull)
        //     return res.status(400).send(errorfull.error.details[0].message);
            // console.log(error)
        
        let test = new Test({
            text_question: newquestion._id,
            test_answer1: newanswer1._id,
            test_answer2: newanswer2._id,
            test_answer3: newanswer3._id,
            test_answer4: newanswer4._id,
            group_id: req.body.group_id
        });
        let newtest = await test.save();

        let answer = null;

        if(reightAnswer === 1){
            answer = new CorrectAnswer({
                test_id: newtest._id,
                answer_id: newanswer1._id
            })
        }

        if(reightAnswer === 2){
            answer = new CorrectAnswer({
                test_id: newtest._id,
                answer_id: newanswer2._id
            })
        }
        
        if(reightAnswer === 3){
            answer = new CorrectAnswer({
                test_id: newtest._id,
                answer_id: newanswer3._id
            })
        }

        if(reightAnswer === 4){
            answer = new CorrectAnswer({
                test_id: newtest._id,
                answer_id: newanswer4._id
            })
        }

        await answer.save()

        return res.status(201).send(_.pick(newtest, ['_id', 'text_question',"test_answer1","test_answer2","test_answer3","test_answer4",,"group_id"]));
    }catch(err){
        return res.status(404).send("Ushbu testni saqlashning imkoni bo'lmadi");
    }

});

module.exports = router;