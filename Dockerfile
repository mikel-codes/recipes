#use ruby 2.7.1 from docker hub as the base image
FROM ruby:2.7

#use or create a folder by the name below to store project files
WORKDIR /rails_react_recipe

# copy all the applications to rails_react_recipe
COPY . /rails_react_recipe
RUN eval "$(docker-machine env default)"

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# 
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn


# copy all the applications to rails_react_recipe

COPY Gemfile Gemfile.lock ./

RUN bundle config build.nokogiri --use-system-libraries

RUN bundle check || bundle install 

COPY package.json yarn.lock ./

#Run yarn to install Javascript depedencies
RUN yarn install --check-files

# Add a script to be executed every time the container starts.
#COPY entrypoint.sh /usr/bin/
#RUN chmod +x /usr/bin/entrypoint.sh
#ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000



CMD [ "rails", "server", "-b", "0.0.0.0"]


