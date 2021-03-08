// app.vue
<template>
  <div style="padding: 10px">
    <div style="margin-bottom: 10px">颜色
      <el-button :type="checked.includes('purple')?'primary':''" @click="()=>handleClick('purple',this.colors)" :disabled="!obj['purple']">purple</el-button>
      <el-button :type="checked.includes('red')?'primary':''" @click="()=>handleClick('red',this.colors)" :disabled="!obj['red']">red</el-button>
    </div>
    <div style="margin-bottom: 10px">套餐
      <el-button :type="checked.includes('one')?'primary':''" @click="()=>handleClick('one',this.sets)" :disabled="!obj['one']">one</el-button>
      <el-button :type="checked.includes('two')?'primary':''" @click="()=>handleClick('two',this.sets)" :disabled="!obj['two']">two</el-button>
      <el-button :type="checked.includes('three')?'primary':''" @click="()=>handleClick('three',this.sets)" :disabled="!obj['three']">three</el-button>
    </div>
    <div style="margin-bottom: 10px">内存
      <el-button :type="checked.includes('64')?'primary':''" @click="()=>handleClick('64',this.sizes)" :disabled="!obj['64']">64</el-button>
      <el-button :type="checked.includes('256')?'primary':''" @click="()=>handleClick('256',this.sizes)" :disabled="!obj['256']">256</el-button>
    </div>
    <div style="margin-bottom: 10px">生产年
      <el-button :type="checked.includes('2018')?'primary':''" @click="()=>handleClick('2018',this.years)" :disabled="!obj['2018']">2018</el-button>
      <el-button :type="checked.includes('2019')?'primary':''" @click="()=>handleClick('2019',this.years)" :disabled="!obj['2019']">2019</el-button>
      <el-button :type="checked.includes('2020')?'primary':''" @click="()=>handleClick('2020',this.years)" :disabled="!obj['2020']">2020</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                colors:['red','purple'],
                sets:['one','two','three'],
                sizes:['64','256'],
                years:['2018','2019','2020'],
                obj:{
                    red:true,
                    purple:true,
                    one:true,
                    two:true,
                    three:true,
                    '64':true,
                    '256':true,
                    '2018':true,
                    '2019':true,
                    '2020':true,
                },
                lists:[
                    [ "one","purple", "64",'2019'],
                    [ "two","purple", "64",'2018'],
                    [ "three","red", "64",'2018'],
                    [ "three","purple", "256",'2019'],
                    [ "three","purple", "64",'2020'],
                ],
                storeList:[],
                checked:[]
            }
        },
        mounted(){
            this.getStoreList()
        },
        methods: {
            handleClick(v,list,listdisable){
                if(!this.checked.includes(v)) {
                    this.checked = this.checked.filter(v=>!list.includes(v))
                    this.checked.push(v)
                }else{
                    this.checked = this.checked.filter(v1=>v1!==v)
                }
                console.log(this.checked)

                var res = this.storeList.filter(l=>this.checkArrayInArray(this.checked,l))
                res=res.flat()
                res = [...new Set(res)]
                for(let k in this.obj){
                    this.obj[k] = false
                }
                for(let v of res){
                    this.obj[v] = true
                }
                // console.log(res)
            },
            getStoreList(){
                var list = [this.colors,this.sets,this.sizes,this.years]
                this.iterator(list[0],[],list)
                this.storeList.push(this.colors)
                this.storeList.push(this.sets)
                this.storeList.push(this.sizes)
                this.storeList.push(this.years)
                // debugger
                let set = new Set()
                this.storeList.forEach(v=>{
                    set.add(JSON.stringify(v))
                })
                this.storeList.length = 0
                set.forEach(v=>{
                    this.storeList.push(JSON.parse(v))
                })
                console.log(this.storeList)
                var a = this.storeList.map(item=>item.join())
                console.log(a)
            },
            getAllGroup(arr){
                let len = arr.length
                let res = []
                for(let v of arr) res.push(v)
                let i = 1
                while(++i<=len){
                    for(let j = 0;j<len;j++){
                        for(let k = j+1;k<=len-i+1;k++){
                            let temp = []
                            temp.push(arr[j])
                            let r = -1
                            while(++r<i-1){
                                temp.push(arr[k+r])
                            }
                            res.push(temp)
                        }
                    }

                }
                return res
            },
            iterator(current,itemsOfPreLevel,all){
                let arr2 = []
                current.forEach(cur=>{
                    if(this.checkArrayInArrays([cur],this.lists)){
                        this.storeList.push([cur])
                    }
                    if(itemsOfPreLevel&&itemsOfPreLevel.length&&!arr2.length){
                        let arr2 = this.getAllGroup(itemsOfPreLevel)
                        arr2.forEach(a2=>{
                            let res1 = [].concat(a2)
                            if(a2.indexOf(cur)!==-1) {}
                            else{
                                res1.push(cur)
                                // console.log(res1)
                                if(this.checkArrayInArrays(res1,this.lists)){
                                    this.storeList.push(res1)
                                }
                            }

                        })
                    }
                    let index = all.indexOf(current)
                    if(index!=-1 && all[index+1]){
                        let next = all[index+1]
                        let itemsOfPreLevel2= itemsOfPreLevel.slice(0)
                        itemsOfPreLevel2.push(cur)
                        this.iterator(next,itemsOfPreLevel2,all)
                    }
                })
            },
            checkArrayInArrays(checkArr,refArrs){
                let l = refArrs.filter(refArr=>checkArr.reduce((o,c)=>o&&refArr.includes(c),true))
                if(l.length) return true
                else return false
            },
            checkArrayInArray(checkArr,refArr){
                let l = checkArr.reduce((o,c)=>o&&refArr.includes(c),true)
                return l
            }
        },
    }
</script>
