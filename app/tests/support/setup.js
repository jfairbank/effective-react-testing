import * as enzyme from 'enzyme'
import EnzymeReactAdapter from 'enzyme-adapter-react-16'
import td from 'testdouble'
import tdJest from 'testdouble-jest'

enzyme.configure({ adapter: new EnzymeReactAdapter() })
tdJest(td, jest)
