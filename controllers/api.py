# Here go your api methods.

import tempfile
import requests
import json

# Cloud-safe of uuid, so that many cloned servers do not all use the same uuids.
from gluon.utils import web2py_uuid
# Here go your api methods.

@auth.requires_signature()
def sell_ticket():
    t_id = db.listing.insert(
        title = request.vars.title,
        price = request.vars.price,
        event_date = request.vars.date,
        description = request.vars.description,
        genre = request.vars.genre,
        event_location = request.vars.event_location,
        is_edit = False,
        user_email = auth.user.email if auth.user is not None else None,

    )
    t = dict(
        id = t_id,
        title = request.vars.title,
        price = request.vars.price,
        event_date = request.vars.date,
        description = request.vars.description,
        genre = request.vars.genre,
        event_location = request.vars.event_location,
        is_edit = False,
        user_email = auth.user.email if auth.user is not None else None,

    )
    return response.json(dict(listing=t))

@auth.requires_signature()
def sell_ticket_event():
    t_id = db.listing.insert(
        title = request.vars.title,
        price = request.vars.price,
        event_date = request.vars.date,
        description = request.vars.description,
        genre = request.vars.genre,
        event_location = request.vars.event_location,

    )
    t = db.listing(t_id)
    return response.json(dict(listing=t))

def songkick():
    info = requests.get("https://api.songkick.com/api/3.0/search/locations.json?query=Cupertino&apikey=lEvytpwl4q8UYTJf")
    return response.json(dict(info=info))

def get_ticket_event_date():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    tickets = []
    has_more = False
    rows = db().select(db.listing.ALL, limitby=(start_idx, end_idx + 1), orderby=db.listing.event_date)
    for i, r, in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id = r.id,
                title = r.title,
                price = r.price,
                user_email = r.user_email,
                first_name = r.first_name,
                last_name = r.last_name,
                user_id = r.user_id,
                sold = r.sold,
                description = r.description,
                event_date = r.event_date,
                is_edit = False,
                genre = r.genre,
                event_location = r.event_location,
                date_posted = r.date_posted,
            )
            tickets.append(t)
        else:
            has_more = True
    #logged_in = auth.user_id is not None
    logged_email = auth.user.email if auth.user is not None else None
    return response.json(dict(
        tickets=tickets,
        has_more=has_more,
        #logged_in=logged_in,
        logged_email=logged_email,
    ))


def get_ticket():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    tickets = []
    has_more = False
    rows = db().select(db.listing.ALL, limitby=(start_idx, end_idx + 1), orderby=~db.listing.date_posted)
    for i, r, in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id = r.id,
                title = r.title,
                price = r.price,
                user_email = r.user_email,
                first_name = r.first_name,
                last_name = r.last_name,
                user_id = r.user_id,
                sold = r.sold,
                description = r.description,
                event_date = r.event_date,
                is_edit = False,
                genre = r.genre,
                event_location = r.event_location,
                date_posted = r.date_posted,
            )
            tickets.append(t)
        else:
            has_more = True
    #logged_in = auth.user_id is not None
    logged_email = auth.user.email if auth.user is not None else None
    return response.json(dict(
        tickets=tickets,
        has_more=has_more,
        #logged_in=logged_in,
        logged_email=logged_email,
    ))


def get_sorted_high_ticket():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    tickets = []
    has_more = False
    rows = db().select(db.listing.ALL, limitby=(start_idx, end_idx + 1), orderby=~db.listing.price)
    for i, r, in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id = r.id,
                title = r.title,
                price = r.price,
                user_email = r.user_email,
                first_name = r.first_name,
                last_name = r.last_name,
                user_id = r.user_id,
                sold = r.sold,
                description = r.description,
                event_date = r.event_date,
                is_edit = False,
                genre = r.genre,
                date_posted = r.date_posted,
            )
            tickets.append(t)
        else:
            has_more = True
    #logged_in = auth.user_id is not None
    logged_email = auth.user.email if auth.user is not None else None
    return response.json(dict(
        tickets=tickets,
        has_more=has_more,
        #logged_in=logged_in,
        logged_email=logged_email,
    ))

def get_sorted_low_ticket():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    tickets = []
    has_more = False
    rows = db().select(db.listing.ALL, limitby=(start_idx, end_idx + 1), orderby=db.listing.price)
    for i, r, in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id = r.id,
                title = r.title,
                price = r.price,
                user_email = r.user_email,
                first_name = r.first_name,
                last_name = r.last_name,
                user_id = r.user_id,
                sold = r.sold,
                description = r.description,
                event_date = r.event_date,
                is_edit = False,
                genre = r.genre,
                date_posted = r.date_posted,
            )
            tickets.append(t)
        else:
            has_more = True
    #logged_in = auth.user_id is not None
    logged_email = auth.user.email if auth.user is not None else None
    return response.json(dict(
        tickets=tickets,
        has_more=has_more,
        #logged_in=logged_in,
        logged_email=logged_email,
    ))


@auth.requires_signature()
def delete_ticket():
    db(db.listing.id == request.vars._id).delete()
    return "ok"

@auth.requires_signature()
def edit_ticket():
    q = db(db.listing.id == request.vars._id).select().first()
    q.update_record(
        title = request.vars.title,
        price = request.vars.price,
        description = request.vars.description,
        event_date = request.vars.event_date,
        genre = request.vars.genre,
        event_location = request.vars.event_location,
    )


def toggle_public():
    q = db(db.checklist.id == request.vars.memo_id).select().first()
    q.update_record(
        is_public = not q.is_public
    )
    return response.json(dict(memo = q))

def get_products():
    t = request.vars.q.strip()
    if request.vars.q:
        q = ((db.listing.title.contains(t)) |
             (db.listing.description.contains(t)))
    else:
        q = db.listing.id > 0
    products = db(q).select(db.listing.ALL)
    # Fixes some fields, to make it easy on the client side.
    return response.json(dict(
        products=products,
    ))


def get_users():
    users = []
    for r in db(db.auth_user.id > 0).select():
        user = dict(
            first_name = r.first_name,
            last_name = r.last_name,
            email = r.email,
            id = r.id,
            profile_image = r.profile_image,
        )
        users.append(user)
    return response.json(dict(users=users,
    ))

def get_message():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    messages = []
    has_more = False
    rows = db().select(db.private_message.ALL, limitby=(start_idx, end_idx + 1), orderby=~db.private_message.timesent)
    for i, r, in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id=r.id,
                from_id=r.from_id,
                to_id=r.to_id,
                timesent=r.timesent,
                subject=r.subject,
                body_text=r.body_text,
                opened=r.opened,
                timeopened=r.timeopened,
                contact_info=r.contact_info,
            )
            messages.append(t)
        else:
            has_more = True
    # logged_in = auth.user_id is not None
    logged_id = auth.user.id if auth.user is not None else None
    return response.json(dict(
        messages=messages,
        has_more=has_more,
        # logged_in=logged_in,
        logged_id=logged_id,
    ))

@auth.requires_signature()
def send_message():
    t_id = db.private_message.insert(
        subject=request.vars.subject,
        body_text=request.vars.body_text,
        contact_info=request.vars.contact_info,
        to_id=request.vars.to_id,

    )
    t = db.private_message(t_id)
    return response.json(dict(private_message=t))

def get_user():
    user = []
    for r in db(db.auth_user.id > 0).select():
        k = dict(
            user_id=r.id,
            first_name=r.first_name,
            last_name=r.last_name,
            email=r.email,
            venmo_username=r.venmo_username,
            profile_text=r.profile_text,
        )
        user.append(k)
    return response.json(dict(
        users=user,
    ))
