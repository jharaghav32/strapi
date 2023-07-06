'use strict';

/**
 * profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile',({ strapi }) => ({
    async createMe(ctx) {
        try {
            const user = ctx.state.user;
            // if(!user){
            //     return ctx.badRequest(400, [{ messages: [{ id: 'No authorization header was found' }] }]);
            // }
            const result = await strapi.entityService.create( 'api::profile.profile', {
                data:{
                    firstName: ctx.request.body.firstName,
                    lastName: ctx.request.body.lastName,
                    user: user.id
                }
            });
            return result;
        } catch (error) {
            return ctx.badRequest(500, [{ messages: [{ id: 'Error' }] }]);
        }
    },
    async getMe(ctx) {
        try {
            const user = ctx.state.user;
            if(!user){
                return ctx.badRequest(400, [{ messages: [{ id: 'No authorization header was found' }] }]);
            }
          const result = await strapi.db.query('api::profile.profile').findOne({
            where: {
                user:{
                    id:{
                        $eq: user.id
                    }
                }
            },
            populate:{
                image:true,
            }
           });
           return result;
        } catch (error) {
            return ctx.badRequest(500, [{ messages: [{ id: 'Error' }] }]);
        }
    }
}));
