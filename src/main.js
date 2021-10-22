import './scss/main.scss' //scss를 여기서 연결하는 것이야. 웹팩에서 main.js로 들어와서 파일들을 살펴보기 때문에.
import { checkType } from './utils/checkType'

const a = 1

const fn = () => {
  console.log(a)
}

const b = [1, 2, 3]
b.includes(2)

console.log('마~잘되나')
console.log(checkType())
