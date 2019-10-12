/*
jQuery Waypoints - v1.1.7
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function($,k,m,i,d){var e=$(i),g="waypoint.reached",b=function(o,n){o.element.trigger(g,n);if(o.options.triggerOnce){o.element[k]("destroy")}},h=function(p,o){if(!o){return -1}var n=o.waypoints.length-1;while(n>=0&&o.waypoints[n].element[0]!==p[0]){n-=1}return n},f=[],l=function(n){$.extend(this,{element:$(n),oldScroll:0,waypoints:[],didScroll:false,didResize:false,doScroll:$.proxy(function(){var q=this.element.scrollTop(),p=q>this.oldScroll,s=this,r=$.grep(this.waypoints,function(u,t){return p?(u.offset>s.oldScroll&&u.offset<=q):(u.offset<=s.oldScroll&&u.offset>q)}),o=r.length;if(!this.oldScroll||!q){$[m]("refresh")}this.oldScroll=q;if(!o){return}if(!p){r.reverse()}$.each(r,function(u,t){if(t.options.continuous||u===o-1){b(t,[p?"down":"up"])}})},this)});$(n).bind("scroll.waypoints",$.proxy(function(){if(!this.didScroll){this.didScroll=true;i.setTimeout($.proxy(function(){this.doScroll();this.didScroll=false},this),$[m].settings.scrollThrottle)}},this)).bind("resize.waypoints",$.proxy(function(){if(!this.didResize){this.didResize=true;i.setTimeout($.proxy(function(){$[m]("refresh");this.didResize=false},this),$[m].settings.resizeThrottle)}},this));e.load($.proxy(function(){this.doScroll()},this))},j=function(n){var o=null;$.each(f,function(p,q){if(q.element[0]===n){o=q;return false}});return o},c={init:function(o,n){this.each(function(){var u=$.fn[k].defaults.context,q,t=$(this);if(n&&n.context){u=n.context}if(!$.isWindow(u)){u=t.closest(u)[0]}q=j(u);if(!q){q=new l(u);f.push(q)}var p=h(t,q),s=p<0?$.fn[k].defaults:q.waypoints[p].options,r=$.extend({},s,n);r.offset=r.offset==="bottom-in-view"?function(){var v=$.isWindow(u)?$[m]("viewportHeight"):$(u).height();return v-$(this).outerHeight()}:r.offset;if(p<0){q.waypoints.push({element:t,offset:null,options:r})}else{q.waypoints[p].options=r}if(o){t.bind(g,o)}if(n&&n.handler){t.bind(g,n.handler)}});$[m]("refresh");return this},remove:function(){return this.each(function(o,p){var n=$(p);$.each(f,function(r,s){var q=h(n,s);if(q>=0){s.waypoints.splice(q,1);if(!s.waypoints.length){s.element.unbind("scroll.waypoints resize.waypoints");f.splice(r,1)}}})})},destroy:function(){return this.unbind(g)[k]("remove")}},a={refresh:function(){$.each(f,function(r,s){var q=$.isWindow(s.element[0]),n=q?0:s.element.offset().top,p=q?$[m]("viewportHeight"):s.element.height(),o=q?0:s.element.scrollTop();$.each(s.waypoints,function(u,x){if(!x){return}var t=x.options.offset,w=x.offset;if(typeof x.options.offset==="function"){t=x.options.offset.apply(x.element)}else{if(typeof x.options.offset==="string"){var v=parseFloat(x.options.offset);t=x.options.offset.indexOf("%")?Math.ceil(p*(v/100)):v}}x.offset=x.element.offset().top-n+o-t;if(x.options.onlyOnScroll){return}if(w!==null&&s.oldScroll>w&&s.oldScroll<=x.offset){b(x,["up"])}else{if(w!==null&&s.oldScroll<w&&s.oldScroll>=x.offset){b(x,["down"])}else{if(!w&&s.element.scrollTop()>x.offset){b(x,["down"])}}}});s.waypoints.sort(function(u,t){return u.offset-t.offset})})},viewportHeight:function(){return(i.innerHeight?i.innerHeight:e.height())},aggregate:function(){var n=$();$.each(f,function(o,p){$.each(p.waypoints,function(q,r){n=n.add(r.element)})});return n}};$.fn[k]=function(n){if(c[n]){return c[n].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof n==="function"||!n){return c.init.apply(this,arguments)}else{if(typeof n==="object"){return c.init.apply(this,[null,n])}else{$.error("Method "+n+" does not exist on jQuery "+k)}}}};$.fn[k].defaults={continuous:true,offset:0,triggerOnce:false,context:i};$[m]=function(n){if(a[n]){return a[n].apply(this)}else{return a.aggregate()}};$[m].settings={resizeThrottle:200,scrollThrottle:100};e.load(function(){$[m]("refresh")})})(jQuery,"waypoint","waypoints",window);

// Melody.social.dev.js
var followers_page_count=1;var following_page_count=1;var activity_stream_page_count=2;var user_activity_page_count=1;var selected_tab='';var notifications_page=1;var social_loading_gif_html='<span id="loading"><img src="'+TemplateP+'/img/ajax-loading.gif" alt="Loading" align="absmiddel" border="0" width="16" height="16" />  '+pm_lang.please_wait+'</span>';$(document).ready(function(){var notification_is_open=false;$('#pm-social-notifications-show').click(function(e){if($('#pm-social-notifications-container').html().length>0){$('#pm-social-notifications-container').html('').hide();notification_is_open=false;return false;}$('.dropdown.open').removeClass('open');$('#pm-social-notifications-container').fadeIn();notifications_page=1;notification_load_more();notification_is_open=true;e.stopPropagation();return false;});$(document).click(function(){if(notification_is_open){$('#pm-social-notifications-container').html('').hide();}});$('a[data-toggle="tab"]').click(function(e){$.waypoints().each(function(){$(this).waypoint('destroy');});});$('a[data-toggle="tab"]').click(function(e){var target=String(e.target);var tabname=target.split('#');selected_tab=tabname[1];if(tabname[1]=='pm-pro-followers'){if(followers_page_count==1){follow_load_more('getfollowers');}else{bind_waypoint('btn_follow_load_more',{offset:"110%",triggerOnce:true},function(){follow_load_more('getfollowers');return false});}}if(tabname[1]=='pm-pro-following'){if(following_page_count==1){follow_load_more('getfollowing');}else{bind_waypoint('btn_follow_load_more',{offset:"110%",triggerOnce:true},function(){follow_load_more('getfollowing');return false});}}if(tabname[1]=='pm-pro-activity-stream'){bind_waypoint('btn_activity_stream_load_more',{offset:"110%",triggerOnce:true},function(){activity_stream_load_more();});}if(tabname[1]=='pm-pro-user-activity'){if(user_activity_page_count==1){user_activity_load_more();}else{bind_waypoint('btn_follow_load_more',{offset:"110%",triggerOnce:true},function(){user_activity_load_more();return false;});}}});bind_follow_actions();bind_user_activity_actions();bind_waypoint('btn_activity_stream_load_more',{offset:"110%",triggerOnce:true},function(){activity_stream_load_more();});$('#hide_who_to_follow').click(function(){$.cookie('suggest_profiles','no',{expires:15,path:'/'});$('.pm-pro-suggest-follow').fadeOut();return false;});});function notification_load_more(){if(notifications_page==1){$('#pm-social-notifications-container').append(social_loading_gif_html);}else{$('#pm-social-notifications-container #btn_notifications_load_more').replaceWith(social_loading_gif_html);}$.ajax({type:"GET",url:MELODYURL2+"/ajax.php",dataType:"html",data:{"p":"profile","do":"load-notifications","uid":$('input[name="profile_user_id"]').val(),"page":notifications_page},dataType:"html",success:function(data){$('#pm-social-notifications-container #loading').remove();if(notifications_page==1){$('#pm-social-notifications-container').html(data);}else{$('#pm-social-notifications-container').append(data);}notifications_page++;bind_waypoint('btn_notifications_load_more',{context:'#pm-social-notifications-container',offset:"110%",triggerOnce:true},function(){notification_load_more();return false;});}});return false;}function bind_waypoint(selector_id,settings,callback){var found=false;$.waypoints().each(function(){if($(this).attr('id')==selector_id){found=true;}});if(!found){$('#'+selector_id).waypoint(function(){if(callback&&typeof(callback)==="function"){callback();}},settings);}return false;}function bind_user_activity_actions(){$('[id^="hide-activity-"]').unbind('click');$('[id^="hide-activity-"]').click(function(){var activity_id=$(this).attr('id').match(/\d+/);if(!activity_id){return false;}$.ajax({type:"GET",url:MELODYURL2+"/ajax.php",data:{"p":"profile","do":"user-activity-hide","uid":$('input[name="profile_user_id"]').val(),"activity_id":activity_id[0]},dataType:"html",success:function(data){$('#activity-'+activity_id[0]).fadeOut();return false;}});return false;});}function user_activity_load_more(){if(user_activity_page_count==1){$('#pm-pro-user-activity-content').append(social_loading_gif_html);}else{$('#pm-pro-user-activity-content #btn_user_activity_load_more').replaceWith(social_loading_gif_html);}$.ajax({type:"GET",url:MELODYURL2+"/ajax.php",data:{"p":"profile","do":"user-activity","uid":$('input[name="profile_user_id"]').val(),"page":user_activity_page_count},dataType:"html",success:function(data){$('#pm-pro-user-activity-content #loading').remove();$("#pm-pro-user-activity-content").append(data);user_activity_page_count++;bind_waypoint('btn_user_activity_load_more',{offset:"110%",triggerOnce:true},function(){user_activity_load_more();return false;});bind_user_activity_actions();return false;}});return false;}function activity_stream_load_more(){if(activity_stream_page_count==1){$('#pm-pro-activity-stream-content').append(social_loading_gif_html);}else{$('#pm-pro-activity-stream-content #btn_activity_stream_load_more').replaceWith(social_loading_gif_html);}$.ajax({type:"GET",url:MELODYURL2+"/ajax.php",data:{"p":"profile","do":"activity-stream","uid":$('input[name="profile_user_id"]').val(),"page":activity_stream_page_count},dataType:"html",success:function(data){$('#pm-pro-activity-stream-content #loading').remove();$("#pm-pro-activity-stream-content").append(data);activity_stream_page_count++;bind_waypoint('btn_activity_stream_load_more',{offset:"110%",triggerOnce:true},function(){activity_stream_load_more();});bind_user_activity_actions();return false;}});return false;}function bind_follow_actions(){$('.btn-follow').unbind('click');$('.btn-unfollow').unbind('click');$('.btn-follow').click(function(){var user_id=$(this).attr('data-user-id');if(!user_id){return false;}$(this).attr("disabled","disabled").addClass("disabled").prepend('<i class="btn-loader"></i>');follow_send_request('follow',user_id);return false;});$('*[id^="btn_unfollow_"]').click(function(){var user_id=$(this).attr('data-user-id');if(!user_id){return false;}$(this).attr("disabled","disabled").addClass("disabled").prepend('<i class="btn-loader"></i>');follow_send_request('unfollow',user_id);return false;});}function follow_load_more(follow_type){if(!follow_type){return false;}if(follow_type=="getfollowers"){var page_count=followers_page_count;if(page_count==1){$('#pm-pro-followers-content').append(social_loading_gif_html);}else{$('#btn_follow_load_more').replaceWith(social_loading_gif_html);}}else{var page_count=following_page_count;if(page_count==1){$('#pm-pro-following-content').append(social_loading_gif_html);}else{$('#btn_follow_load_more').replaceWith(social_loading_gif_html);}}$.ajax({type:"GET",url:MELODYURL2+"/ajax.php",data:{"p":"profile","do":follow_type,"uid":$('input[name="profile_user_id"]').val(),"page":page_count},dataType:"html",success:function(data){if(follow_type=="getfollowers"){$('#pm-pro-followers-content #loading').remove();$("#pm-pro-followers-content").append(data);followers_page_count++;}else{$('#pm-pro-following-content #loading').remove();$("#pm-pro-following-content").append(data);following_page_count++;}bind_follow_actions();bind_waypoint('btn_follow_load_more',{offset:"110%",triggerOnce:true},function(){follow_load_more(follow_type);return false});return false;}});return false}function follow_send_request(follow_type,user_id){if(!follow_type||!user_id){return false;}$.ajax({type:"POST",url:MELODYURL2+"/ajax.php",data:{"p":"profile","do":follow_type,"uid":user_id},dataType:"json",success:function(a){if(a.success==false){alert(a.msg);$('.btn-follow').each(function(){if($(this).attr('data-user-id')==user_id){$(this).removeAttr("disabled").removeClass("disabled");}});return false}if(follow_type=="follow"){$('.btn-follow').each(function(){if($(this).attr('data-user-id')==user_id){$(this).replaceWith(a.html);}});bind_follow_actions();}else{$('.btn-unfollow').each(function(){if($(this).attr('data-user-id')==user_id){$(this).replaceWith(a.html);}});bind_follow_actions();}return false}});return false}function update_status(){var form=$('form[name="user-update-status"]');var txt=form.find('textarea').val();var parent_el='#pm-pro-activity-stream-content';if(txt!=form.find('textarea').attr('placeholder')){form.find('button').attr("disabled","disabled");if(selected_tab=='pm-pro-user-activity'){parent_el='#pm-pro-user-activity-content';}$(parent_el+' #preview_status').html(social_loading_gif_html);$.ajax({type:"POST",url:MELODYURL2+"/ajax.php",data:{"p":"profile","do":"update-status","uid":$('input[name="profile_user_id"]').val(),"txt":txt},dataType:"json",success:function(data){if(data.success==false){alert(data.msg);$('#preview_status').html('');return false;}$(parent_el+' #preview_status').replaceWith(data.html);bind_user_activity_actions();form.find('textarea').val('');form.find('button').removeAttr("disabled");}});}return false;}