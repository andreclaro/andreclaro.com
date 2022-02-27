# /bin/zsh
hugo
cd public/
pwd
sed -i -- 's,/blog",/blog/index.html",g' **/*html
sed -i -- 's,/blog-post/",/blog-post/index.html",g' **/*html
