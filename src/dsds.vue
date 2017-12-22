<div>
      <input name='name' @input='onChange($event)'>
      <input name='headline' @input='onChange($event)'>
      <input name='status' @input='onChange($event)'>
      <input name='logo' @input='onChange($event)'>
      <button @click='onClick'>Submit</button>
    </div>
    <div>
      <p v-text='txt'></p>
    </div>

    
<script>
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import FormContainer from './components/FormContainer'

@Component({
  components: FormContainer
})
export default class App extends Vue {
  // message = 'hello from vue component'
  messages = ['one', 'two', 'three', 'four', 'five']
  txt = ''
  obj = {}
}
</script>