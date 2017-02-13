//import expect from "expect";
import { describe, it } from "mocha";
//import configureMockStore from "redux-mock-store";
//import thunk from "redux-thunk";
import nock from "nock";

//import * as actions from "../../app/actions/DataFetchActions";

//const middlewares = [thunk];
//const mockStore = configureMockStore(middlewares);

describe("ACTION-CREATOR: DataFetchActions", () => {
    afterEach(() => {
        nock.cleanAll();
    });

    describe("AC: fetchCourseInfo", () => {
        it("Creates fetch course info success action upon sucess", () => {
            
            /*
            const mockResp = {data: "Fake Course Data here"};

            nock("https://test")
                .get("/courses/info/testCourse")
                .reply(200, {data: "Fake Course Data here"});
            
            const expectedActions = [
                {type: "FETCH_COURSE_INFO_PENDING"},
                {type: "FETCH_COURSE_INFO_FULFILLED", payload: mockResp}
            ];

            const store = mockStore({});

            return store.dispatch(actions.fetchCourseInfo("testCourse"))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });

            */
        });

        it("Creates fetch course info rejected action upon failure", () => {

        });
    });
});

/*
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/TodoActions'
import * as types from '../../constants/ActionTypes'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('http://example.com/')
      .get('/todos')
      .reply(200, { body: { todos: ['do something'] }})

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

*/