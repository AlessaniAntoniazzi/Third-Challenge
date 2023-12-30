import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    birhtDate:{
        type: Date,
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    }
});

export const userModel = mongoose.model('User', userSchema);
