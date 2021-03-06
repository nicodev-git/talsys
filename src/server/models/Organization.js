const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    email: {
        type: String,
        //required: true,
    },
    domain: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            //required: true,
        },
        city: {
            type: String,
            //required: true,
        },
        province: {
            type: String,
            //required: true,
        },
        country: {
            type: String,
            // required: true,
        },

        postalCode: {
            type: String,
            // required: true,
        },
    },
    stripe: {
        stripeAdminCustomerId: {
            type: String,
        },
        stripeSubscriptionId: {
            type: String
        },
        stripePlanId: {
            type: String,
        },
        stripeAdminCustomerToken: {
            type: String,
        },
        plan: {
            type: String,
        },
        interval: {
            type: String,
        }
    }
});

module.exports = mongoose.model('Organization', OrganizationSchema);
