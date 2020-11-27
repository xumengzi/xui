echo '删除book目录'
rm -rf book && rm -rf _book

echo '删除完毕'

echo '准备开启本地服务http://localhost:4000/'
gitbook serve