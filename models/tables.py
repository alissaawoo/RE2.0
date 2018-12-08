# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.

import datetime

def get_user_email():
    return auth.user.email if auth.user else None


db.define_table('listing',
                  Field('title'),
                  Field('price', 'decimal(6,2)'),
                  Field('sold', 'boolean', default=False),
                  Field('genre'),
                  Field('event_location'),
                  Field('first_name', default= auth.user.first_name if auth.user else None),
                  Field('last_name', default= auth.user.last_name if auth.user else None),
                  Field('user_id', 'reference auth_user', default=auth.user_id),
                # Field('phone'),
                  Field('user_email', default= auth.user.email if auth.user else None),
                  Field('event_date', 'date'),
                  Field('description', 'text'),
                  Field('date_posted', 'datetime', default=request.now),
                )

# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)

db.define_table('checklist',
                Field('user_email', default=get_user_email()),
                Field('title'),
                Field('memo', 'text'),
                Field('is_public', 'boolean', default=False),
                Field('updated_on', 'datetime', update=datetime.datetime.utcnow())

                )

db.define_table('private_message',
                Field('from_id', 'reference auth_user', default=auth.user_id, readable=False, writable=False),
                Field('to_id'),
                Field('timesent', 'datetime', default=request.now, readable=False, writable=False),
                Field('subject', 'string', length=255),
                Field('body_text','text'),
                Field('contact_info', 'text'),
                Field('opened', 'boolean', writable=False, readable=False, default=False),
                Field('timeopened', 'datetime', readable=False, writable=False),
               )




db.checklist.updated_on.writable = db.checklist.updated_on.readable = False
db.checklist.id.writable = db.checklist.id.readable = False
