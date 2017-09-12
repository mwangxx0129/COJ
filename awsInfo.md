# aws instance of ubuntu1.04

## info of instance
0. account user password
``` 7198-6755-7698 ```
``` wang ```
``` wang ```

1. instance ID
```i-03c2e22457f5593d1```

2. Public DNS (IPv4)
```ec2-34-229-58-27.compute-1.amazonaws.com```

3. IPv4 Public IP 
```
34.229.58.27
```
frontend: http://34.229.58.27:3000
backend: http://34.229.58.27:5000


## login from dir include wang_key_pair_ca.pem
```
ssh -i ./wang_key_pair_ca.pem ubuntu@ec2-34-229-58-27.compute-1.amazonaws.com
```

## file upload to instance
```scp -i ./wang_key_pair_ca.pem [/path/SampleFile.txt] ubuntu@ec2-34-229-58-27.compute-1.amazonaws.com:~```

## file download to local
```scp -i ./wang_key_pair_ca.pem ubuntu@ec2-34-229-58-27.compute-1.amazonaws.com:~/SampleFile.txt ~/SampleFile2.txt```



# Ref of Anaconda
http://www.jianshu.com/p/2f3be7781451
