import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title: {
        type: String
    },
    difficulty: {
        type: String
    },
    solution: {
        type: String
    },
    description: {
        type: Object,
        statement: {
            type: String
        },
        constraints: {
            type: [String],
        },
        sampleio: {
            type: [[String]]
        },
        input_format: {
            type: String
        },
        output_format: {
            type: String
        },
    },
    testcases: {
        type: [[String]]
    }
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;