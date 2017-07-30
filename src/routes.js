import {Router} from 'express';

const routes = Router();
const names = [{
    names: [
        {name: 'Ihor'},
        {name: 'Nikolay'}
    ]
}];

routes.get('/', (req, res) => {
    res.json(names);
});

export default routes;