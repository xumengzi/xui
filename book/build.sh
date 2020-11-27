echo '正在准备ing'

echo '删除无关文件_book/book'
rm -fr _book && rm -fr book

echo 'build'
gitbook build

echo '改名'
mv _book book

echo '提交github'
git add . && git commit -m $1 && git push

echo '成功'