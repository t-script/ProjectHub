/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
    '/'      : 'IndexController.index',
    '/start' : 'IndexController.singin',

    'POST /login'  : 'LoginController.login',
    'POST /logout' : 'LoginController.logout',
    'POST /forgot' : 'LoginController.forgotPassword',
    'POST /reset'  : 'LoginController.resetPassword',

    'POST /chat/sendPrivateMsg'    : 'ChatController.sendPrivateMsg',
    'GET /chat/getPrivateMessages' : 'ChatController.getPrivateMessages',
    'GET /chat/joinProjectRoom'    : 'ChatController.joinProjectRoom',

    'POST /createProject' : 'ProjectController.createProject',
    'GET /ownProject'     : 'ProjectController.getProjectsByUser',
    'POST /addMember'     : 'ProjectController.addMember',
    'GET /getMembers'     : 'ProjectController.getMembers',

    'POST /createTickets'   : 'TicketsController.createTickets',
    'GET /getTickets'       : 'TicketsController.getTickets',
    'GET /getTicketsbyUser' : 'TicketsController.getTicketsbyUser',

    'GET /kanbanColums'      : 'KanbanController.getKanbanColumns',
    'POST /updateTicket'     : 'KanbanController.updateTicket',
    'POST /addTicketToBoard' : 'KanbanController.addTicketToBoard',

    'GET /getUsername' : 'UserController.getUsername',
    'POST /updateUser' : 'UserController.updateUser',

    'POST /startVoting' : 'PokerController.startVoting',
    'POST /stopVoting'  : 'PokerController.stopVoting',
    'POST /vote'        : 'PokerController.vote',
    'POST /saveValue'   : 'PokerController.saveValue'
};
