NodeJS提供了child_process模块快cluster模块来实现多进程以及进程的管理。也就是常说的Master-Worker模式，也就是说进程分为Master（主）进程和worker（工作）进程。master进程负责调度或管理worker进程，那么worker进程负责具体的业务处理。master进程负责创建worker，接收客户端的请求，然后分配到各个服务器上去处理，并且监控worker进程的运行状态及进行管理操作。

## child_process中有四种方法创建子进程
1. spawn执行的是非node程序，执行结果以流的形式返回
2. execFile执行的是非node程序，执行结果以回调的形式返回
3. exec执行的是非node程序，提供shell命令，一回调的形式返回。
4. fork执行的是node程序，执行的结果以流的形式返回。

