<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="Task Manger" :showAddTask='showAddTask'/>
    <div v-show="showAddTask">
       <AddTask @add-task="AddTask"/>
    </div>
    <Tasks @toggle-reminder="toggelReminder"
     @delete-task="deleteTask" :tasks='tasks' />
  </div>
</template>

<script>
import Header from './components/Header' 
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask,
  },

  data(){
    return{
      tasks : [],
      showAddTask: false
    }
  },
  methods:{
    toggleAddTask(){
      this.showAddTask = !this.showAddTask ;
    },
    async deleteTask(id){
      if(confirm('Are You sure?')){
        const res = await fetch(`https://task-tracker-backend2.herokuapp.com/tasks/${id}` , {
          method : 'DELETE',

        })

        res.status == 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error Deleting Task!!')
      }
    },
    async toggelReminder(id){
      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle , reminder : !taskToToggle.reminder}

      const res = await fetch(`https://task-tracker-backend2.herokuapp.com/tasks/${id}`,{
        method:'PUT',
        headers:{
          'Content-type' : 'application/json'
        },
        body:JSON.stringify(updTask)
      })
      const data = await res.json()
      this.tasks = this.tasks.map((task) => task.id === id ? {...task , reminder: data.reminder} : task)
    },
    async AddTask(task){
      const res = await fetch('https://task-tracker-backend2.herokuapp.com/tasks' , {
        method: 'POST',
        headers:{
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(task)

      })
      const data = await res.json() 
      this.tasks = [...this.tasks , data]
    },
    async fetchTasks(){
      const res = await fetch('https://task-tracker-backend2.herokuapp.com/tasks') 
      const data = await res.json() 
      
      return data
    },
    async fetchTask(id){
      const res = await fetch(`https://task-tracker-backend2.herokuapp.com/tasks/${id}`) 
      const data = await res.json() 

      return data
    }

    
  },
  async created() {
    this.tasks = await this.fetchTasks()
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
