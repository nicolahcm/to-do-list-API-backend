'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

exports.list_all_tasks = function (req, res) {
    var query = req.query;
    console.log("query", query);

    Task.find(query, function (err, task) {
        if (err)
            res.send(err);
        //console.log(task[0].priority, task[0])
        res.json(task);
        // Sending ordered tasks
        /*var ordered_tasks = [];

        for (let k = 0; k < task.length; k++) {
            if (task[k].priority == true) {
                ordered_tasks = [task[k]] + ordered_tasks
            } else {
                ordered_tasks.push(task[k])
            }
        };
        console.log("ordered tasks", ordered_tasks);
        res.json(ordered_tasks)*/
    });
};




exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};



exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function (req, res) {


    Task.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};


// Patch
// exports.patch_a_task = function (req, res) {
//}


exports.list_completed_tasks = function (req, res) {
    Task.find({ "status": ["completed"] }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


/*exports.patch_a_task = function (req, res) {
    console.log("req.params.taskId", req.params.taskId);
    console.log("req.body", req.body);
    Task.find({ _id: req.params.taskId }, function (err, task) {
        if (err)
            res.send(err);
        console.log("task", task);
    });*/


exports.patch_a_task = function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, { $set: req.body }, { new: true }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}



