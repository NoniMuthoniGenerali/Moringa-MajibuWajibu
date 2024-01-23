from config import db, app
from faker import Faker
from models import User, Comment, Vote, Post
from random import choice
from config import bcrypt

fake = Faker()


def seed_database():
    print("Deleting records 🚮🚮")
    User.query.delete()
    Comment.query.delete()
    Vote.query.delete()
    Post.query.delete()

    print("seeding Users 👫👫👫")
    emails = ['allan.njoroge@student.moringaschool.com', 'samson.githinji@student.moringaschool.com', 'noni.muthoni@student.moringaschool.com',
              'mercy.mwongeli@student.moringaschool.com', 'nahason.murithi@student.moringaschool.com']

    usernames = ['allanimated', 'githinjisamson1',
                 'generalimuthoni', 'mercymwongeli', 'nahasonmurithi']
    full_names = ['Allan Njoroge', 'Samson Githinji',
                  'Noni Muthoni', 'Mercy Mwongeli', 'Nahason Murithi']
    passwords = ['daskjdka', 'duejnsdbh',
                 'eruiapodxdba', 'aueoqnckas', 'dlkaojuhs']

    users = []
    for i in range(5):
        user = User(
            username=usernames[i],
            email=emails[i],
            full_name=full_names[i],
            _password_hash=bcrypt.generate_password_hash(
                passwords[i].encode('utf-8'))
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    users_ids = [user.id for user in User.query.all()]
    print('Complete 🎰🎰')

    phases = [0, 1, 2, 3, 4, 5]

    print('Inserting posts📇')
    posts = []
    for  i in range (5):
            post =Post(
                phase=choice(phases),
                title=fake.text(max_nb_chars=100),
                content=fake.text(max_nb_chars=1000),
                resources=fake.url(),
                user_id=choice(users_ids)
            )
            posts.append(post)
    db.session.add_all(posts)
    db.session.commit()

    print ('Inserting Comments📯📯')
    post_ids =[post.id for post in Post.query.all()]
    comments = []
    for i in range(10):
        comment = Comment(
            content = fake.text(max_nb_chars=1000),
            user_id=choice(users_ids),
            post_id=choice(post_ids)
        )
        comments.append(comment)
    db.session.add_all(comments)
    db.session.commit()
    print('complete🤝')

    vote_types = [0,1]
    votes = []
    for i in range(10):
        vote = Vote(
            vote_type=choice(vote_types),
            user_id=choice(users_ids),
            post_id=choice(post_ids)
        )
        votes.append(vote)
    db.session.add_all(votes)
    db.session.commit()

    print('Inserting Votes 🎟️')

if __name__ == '__main__':
    with app.app_context():
        seed_database()


       