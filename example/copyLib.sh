# this is a simple hack to test the actual lib build without publishing it
# yeah, I know, it's an anti-pattern
yarn --cwd ../ build && rsync -a ../lib/ ./node_modules/react-use-activity/
