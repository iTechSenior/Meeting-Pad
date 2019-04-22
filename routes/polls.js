const express = require('express');
const router = express.Router();
const { aW, response, isInArrayM } = require('../helpers');
const { isLoggedIn, isOrganizer } = require('../middlewares');
const { Document, Poll } = require('../models');

// /api/polls

/**
 * Get all polls from DB populated with corresponding documents
 */
router.get('/', isLoggedIn, isOrganizer, aW(async (req, res) => {
  const polls = await Poll.find({}).sort('-createdAt').lean().exec();
  return res.status(200).json(polls);
}));

/**
 * Get the poll with corresponding ID
 */
router.get('/:_id', isLoggedIn, isOrganizer, aW(async (req, res) => {
  const { _id } = req.params;
  const poll = await Poll.findOne({ _id });
  if (!poll) return res.status(404).json(response(false, 'Poll not found!'));
  res.status(200).json(poll);
}));

/**
 * Create new poll on document
 */
router.post('/', isLoggedIn, isOrganizer, aW(async (req, res) => {
  const { title, answers } = req.body;
  if (!title || !answers || !Array.isArray(answers) || answers.length == 0) {
    return res.status(400).json(response(false, 'Please enter all fields.'));
  }
  const answersForModel = answers.map(answer => {
    return { value: answer, votes: [] }
  });
  await Promise.all([
    document.save(),
    Poll.create({ title, answers: answersForModel })
  ]);
  return res.status(200).json(response(true, 'Poll created!'));
}));

/**
 * User votes on Poll
 */
router.post('/vote/:_id/:aId', isLoggedIn, aW(async (req, res) => {
  const { _id, aId } = req.params;
  const poll = await Poll.findOne({ _id });
  if (!poll) return res.status(404).json(response(false, 'Poll is not found!'));
  const answer = poll.answers.id(aId);
  if (!answer) return res.status(400).json(response(false, 'Poll is not found!'));
  const isInArray = poll.answers.some(a => isInArrayM(a.votes, req.user._id));
  if (isInArray) return res.status(400).json(response(false, "You've already voted!"));
  answer.votes.push(req.user._id);
  await poll.save();
  return res.status(200).json(response(true, "You've voted successfully!"));
})); 

module.exports = router;